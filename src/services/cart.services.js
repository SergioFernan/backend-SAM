import CartModel from "../models/cart.model.js";

// crear un nuevo carrito en la base de datos
const dbCreateCart = async (newCart) => {
    return await CartModel.create(newCart);
};

// obtener todos los carritos registrados
const dbGetCarts = async () => {
    return await CartModel.find()
        .populate("userId", "name email")    // trae solo el nombre y correo del usuario
        .populate("items.productId");        // trae el detalle de los productos
};

// buscar un carrito por su id
const dbGetCartById = async (id) => {
    return await CartModel.findById(id)
        .populate("userId", "name email")
        .populate("items.productId");
};

// actualizar un carrito por su id
// { new: true } para que devuelva el documento ya actualizado y no el original
const dbUpdateCart = async (id, inputData) => {
    return await CartModel.findByIdAndUpdate(id, inputData, { new: true });
};

// eliminar un carrito por su id
const dbDeleteCart = async (id) => {
    return await CartModel.findByIdAndDelete(id);
};

export {
    dbCreateCart,
    dbGetCarts,
    dbGetCartById,
    dbUpdateCart,
    dbDeleteCart,
};
