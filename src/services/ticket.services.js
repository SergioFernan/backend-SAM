import TicketModel from "../models/ticket.model.js";
import EventModel from "../models/Events.models.js";

const dbCreateTicket = async (newTicket) => {
    // Validar que el evento existe
    const event = await EventModel.findById(newTicket.eventId);
    if (!event) {
        const error = new Error("El evento no existe");
        error.name = "NotFoundError";
        throw error;
    }

    // Validar disponibilidad de boletas
    if (event.availableTickets < newTicket.quantity) {
        const error = new Error(
            `No hay suficientes boletas disponibles. Disponibles: ${event.availableTickets}, Solicitadas: ${newTicket.quantity}`
        );
        error.name = "AvailabilityError";
        throw error;
    }

    // Decrementar availableTickets del evento
    await EventModel.findByIdAndUpdate(newTicket.eventId, {
        $inc: { availableTickets: -newTicket.quantity }
    });

    // Crear el ticket
    return await TicketModel.create(newTicket);
};

const dbGetTickets = async () => {
    return await TicketModel.find()
        .populate('eventId', 'name initialDate finalDate imageUrl')
        .populate('userId', 'name email');
};

const dbGetTicketById = async (id) => {
    return await TicketModel.findById(id)
        .populate('eventId', 'name initialDate finalDate imageUrl')
        .populate('userId', 'name email');
};

const dbGetTicketsByUserId = async (userId) => {
    return await TicketModel.find({ userId })
        .populate('eventId', 'name initialDate finalDate imageUrl')
        .populate('userId', 'name email');
};

const dbDeleteTicket = async (id) => {
    return await TicketModel.findByIdAndDelete(id);
};

const dbUpdateTicket = async (id, inputData) => {
    return await TicketModel.findByIdAndUpdate(id, inputData, { new: true })
        .populate('eventId', 'name initialDate finalDate imageUrl')
        .populate('userId', 'name email');
};

export {
    dbCreateTicket,
    dbGetTickets,
    dbGetTicketById,
    dbGetTicketsByUserId,
    dbDeleteTicket,
    dbUpdateTicket
};