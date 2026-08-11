import mongoose from "mongoose";
import {
    dbCreateCart,
    dbGetCarts,
    dbGetCartById,
    dbUpdateCart,
    dbDeleteCart,
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

        // error 11000 significa que ya existe un documento unico (ej. carrito para el usuario)
        if (error.code === 11000) {
            return res.status(409).json({
                msg: "Error: ya existe un carrito para este usuario",
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

export { getCarts, getCartById, postCart, patchCart, deleteCart };
