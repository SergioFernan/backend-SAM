import mongoose from "mongoose";
import {
    dbCreateCart,
    dbGetCarts,
    dbGetCartById,
    dbUpdateCart,
    dbDeleteCart,
    dbCheckoutCart,
} from "../services/cart.services.js";

// obtener todos los carritos
const getCarts = async (req, res) => {
    try {
        const data = await dbGetCarts();

        res.status(200).json({
            msg: "Carritos obtenidos correctamente",
            data: data,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            msg: "No se pudieron obtener los carritos",
        });
    }
};

// obtener un carrito por su id
const getCartById = async (req, res) => {
    try {
        const id = req.params.id;

        // validar que el id tenga el formato correcto de mongo
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "Error Id: el formato del id no es valido",
            });
        }

        const data = await dbGetCartById(id);

        // si no existe el documento en la base de datos
        if (!data) {
            return res.status(404).json({
                msg: "Error Id: no se encontro el carrito con ese id",
            });
        }

        res.status(200).json({
            msg: "Carrito obtenido correctamente",
            data: data,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            msg: "No se pudo obtener el carrito",
        });
    }
};

// crear un nuevo carrito
const postCart = async (req, res) => {
    try {
        const inputData = req.body; // datos que vienen del body del request

        const data = await dbCreateCart(inputData);

        res.status(201).json({
            msg: "Carrito creado correctamente",
            data: data,
        });

    } catch (error) {
        console.error(error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                msg: "Error de validación",
                errors: Object.values(error.errors).map(e => e.message)
            });
        }

        if (error.name === 'LimitError') {
            return res.status(400).json({
                msg: error.message
            });
        }

        res.status(500).json({
            msg: "No se pudo crear el carrito",
            error: error.message
        });
    }
};

// actualizar un carrito por su id
const patchCart = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body; // campos a actualizar

        // validar el id antes de consultar la base de datos
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "Error Id: el formato del id no es valido",
            });
        }

        const data = await dbUpdateCart(id, inputData);

        if (!data) {
            return res.status(404).json({
                msg: "Carrito no encontrado para actualizar",
            });
        }

        res.status(200).json({
            msg: "Carrito actualizado correctamente",
            data: data,
        });

    } catch (error) {
        console.error(error);

        // CastError ocurre cuando mongo no puede convertir el id
        if (error.name === "CastError") {
            return res.status(400).json({
                msg: "Error Id: no se pudo actualizar, id incorrecto",
            });
        }

        if (error.name === 'LimitError') {
            return res.status(400).json({
                msg: error.message
            });
        }

        res.status(500).json({
            msg: "No se pudo actualizar el carrito",
        });
    }
};

// eliminar un carrito por su id
const deleteCart = async (req, res) => {
    try {
        const id = req.params.id;

        // validar el id antes de intentar eliminar
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "Error Id: el formato del id no es valido",
            });
        }

        const data = await dbDeleteCart(id);

        // si no encontro nada para eliminar
        if (!data) {
            return res.status(404).json({
                msg: "No se puede eliminar un carrito que no existe",
            });
        }

        res.status(200).json({
            msg: "Carrito eliminado correctamente",
            data: data,
            id: id,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            msg: "No se pudo eliminar el carrito",
        });
    }
};

// procesar checkout del carrito (crear tickets y decrementar aforo)
const checkoutCart = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "Error Id: el formato del id no es válido",
            });
        }

        const result = await dbCheckoutCart(id);

        res.status(200).json({
            msg: "Checkout procesado correctamente",
            data: result,
        });

    } catch (error) {
        console.error(error);

        if (error.name === 'NotFoundError') {
            return res.status(404).json({
                msg: error.message,
            });
        }

        if (error.name === 'AvailabilityError') {
            return res.status(400).json({
                msg: error.message,
            });
        }

        if (error.name === 'StatusError') {
            return res.status(400).json({
                msg: error.message,
            });
        }

        res.status(500).json({
            msg: "No se pudo procesar el checkout",
        });
    }
};

export { getCarts, getCartById, postCart, patchCart, deleteCart, checkoutCart };
