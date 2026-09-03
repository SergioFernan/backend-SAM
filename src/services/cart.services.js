import mongoose from "mongoose";
import CartModel from "../models/cart.model.js";
import TicketModel from "../models/ticket.model.js";
import EventModel from "../models/Events.models.js";

const validateTicketLimit = async (userId, items, cartIdToExclude = null) => {
    if (!items || items.length === 0) return;

    for (const item of items) {
        const eventId = item.eventId;
        const quantityToBuy = item.quantity;
        
        // Sumar tickets comprados
        const purchasedTickets = await TicketModel.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId), eventId: new mongoose.Types.ObjectId(eventId), status: { $ne: 'Cancelada' } } },
            { $group: { _id: null, total: { $sum: '$quantity' } } }
        ]);
        const purchasedCount = purchasedTickets.length > 0 ? purchasedTickets[0].total : 0;

        // Sumar tickets en carritos pendientes
        const matchPending = { userId: new mongoose.Types.ObjectId(userId), status: 'pending' };
        if (cartIdToExclude) {
            matchPending._id = { $ne: new mongoose.Types.ObjectId(cartIdToExclude) };
        }

        const pendingCarts = await CartModel.aggregate([
            { $match: matchPending },
            { $unwind: '$items' },
            { $match: { 'items.eventId': new mongoose.Types.ObjectId(eventId) } },
            { $group: { _id: null, total: { $sum: '$items.quantity' } } }
        ]);
        const pendingCount = pendingCarts.length > 0 ? pendingCarts[0].total : 0;

        if (purchasedCount + pendingCount + quantityToBuy > 4) {
            const error = new Error('El usuario no puede comprar más de 4 boletas para un mismo evento');
            error.name = 'LimitError';
            throw error;
        }
    }
};

// crear un nuevo carrito en la base de datos
const dbCreateCart = async (newCart) => {
    if (newCart.userId && newCart.items) {
        await validateTicketLimit(newCart.userId, newCart.items);
    }

    // Calcular totalPrice automáticamente
    if (newCart.items && newCart.items.length > 0) {
        newCart.totalPrice = newCart.items.reduce((sum, item) => {
            return sum + (item.unitPrice * item.quantity);
        }, 0);
    }
    return await CartModel.create(newCart);
};

// obtener todos los carritos registrados
const dbGetCarts = async () => {
    return await CartModel.find()
        .populate("userId", "name email")
        .populate("items.eventId", "name initialDate finalDate imageUrl");
};

// buscar un carrito por su id
const dbGetCartById = async (id) => {
    return await CartModel.findById(id)
        .populate("userId", "name email")
        .populate("items.eventId", "name initialDate finalDate imageUrl");
};

// actualizar un carrito por su id
const dbUpdateCart = async (id, inputData) => {
    // Recalcular totalPrice si se actualizan items
    if (inputData.items && inputData.items.length > 0) {
        const currentCart = await CartModel.findById(id);
        if (currentCart) {
            await validateTicketLimit(currentCart.userId, inputData.items, id);
        }

        inputData.totalPrice = inputData.items.reduce((sum, item) => {
            return sum + (item.unitPrice * item.quantity);
        }, 0);
    }
    return await CartModel.findByIdAndUpdate(id, inputData, { new: true })
        .populate("userId", "name email")
        .populate("items.eventId", "name initialDate finalDate imageUrl");
};

// eliminar un carrito por su id
const dbDeleteCart = async (id) => {
    return await CartModel.findByIdAndDelete(id);
};

// Procesar checkout: crear tickets y decrementar aforo
const dbCheckoutCart = async (cartId) => {
    const cart = await CartModel.findById(cartId);
    if (!cart) {
        const error = new Error("Carrito no encontrado");
        error.name = "NotFoundError";
        throw error;
    }

    if (cart.status !== 'pending') {
        const error = new Error(`El carrito ya fue procesado (estado: ${cart.status})`);
        error.name = "StatusError";
        throw error;
    }

    if (!cart.items || cart.items.length === 0) {
        const error = new Error("El carrito está vacío");
        error.name = "ValidationError";
        throw error;
    }

    const createdTickets = [];

    // Validar disponibilidad de todos los items primero
    for (const item of cart.items) {
        const event = await EventModel.findById(item.eventId);
        if (!event) {
            const error = new Error(`Evento ${item.eventId} no encontrado`);
            error.name = "NotFoundError";
            throw error;
        }
        if (event.availableTickets < item.quantity) {
            const error = new Error(
                `No hay suficientes boletas para el evento "${event.name}". Disponibles: ${event.availableTickets}, Solicitadas: ${item.quantity}`
            );
            error.name = "AvailabilityError";
            throw error;
        }
    }

    // Crear tickets y decrementar aforo
    for (const item of cart.items) {
        // Decrementar availableTickets
        await EventModel.findByIdAndUpdate(item.eventId, {
            $inc: { availableTickets: -item.quantity }
        });

        // Crear ticket
        const ticket = await TicketModel.create({
            eventId: item.eventId,
            userId: cart.userId,
            quantity: item.quantity,
            zone: item.zone,
            totalPrice: item.unitPrice * item.quantity,
            status: 'Comprada'
        });

        createdTickets.push(ticket);
    }

    // Marcar carrito como completado
    cart.status = 'completed';
    await cart.save();

    return {
        cart: cart,
        tickets: createdTickets
    };
};

export {
    dbCreateCart,
    dbGetCarts,
    dbGetCartById,
    dbUpdateCart,
    dbDeleteCart,
    dbCheckoutCart,
};
