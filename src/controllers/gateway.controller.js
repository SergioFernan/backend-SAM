import mongoose from "mongoose";
import {
    dbCreateGateway,
    dbGetGateways,
    dbGetGatewayById,
    dbUpdateGateway,
    dbDeleteGateway,
} from "../services/gateway.services.js";

// obtener todas las pasarelas
const getGateways = async (req, res) => {
    try {
        const data = await dbGetGateways();

        res.status(200).json({
            msg: "Pasarelas obtenidas correctamente",
            data: data,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            msg: "No se pudieron obtener las pasarelas",
        });
    }
};

// obtener una pasarela por su id
const getGatewayById = async (req, res) => {
    try {
        const id = req.params.id;

        // validar que el id tenga el formato correcto de mongo
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "Error Id: el formato del id no es valido",
            });
        }

        const data = await dbGetGatewayById(id);

        // si no existe el documento en la base de datos
        if (!data) {
            return res.status(404).json({
                msg: "Error Id: no se encontro la pasarela con ese id",
            });
        }

        res.status(200).json({
            msg: "Pasarela obtenida correctamente",
            data: data,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            msg: "No se pudo obtener la pasarela",
        });
    }
};

// crear una nueva pasarela
const postGateway = async (req, res) => {
    try {
        const inputData = req.body; // datos que vienen del body del request

        const data = await dbCreateGateway(inputData);

        res.status(201).json({
            msg: "Pasarela creada correctamente",
            data: data,
        });

    } catch (error) {
        console.error(error);

        // error 11000 significa que ya existe un documento con ese nombre
        if (error.code === 11000) {
            return res.status(409).json({
                msg: "Error: ya existe una pasarela con ese nombre",
            });
        }

        res.status(500).json({
            msg: "No se pudo crear la pasarela",
        });
    }
};

// actualizar una pasarela por su id
const patchGateway = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body; // campos a actualizar

        // validar el id antes de consultar la base de datos
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "Error Id: el formato del id no es valido",
            });
        }

        const data = await dbUpdateGateway(id, inputData);

        res.status(200).json({
            msg: "Pasarela actualizada correctamente",
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
            msg: "No se pudo actualizar la pasarela",
        });
    }
};

// eliminar una pasarela por su id
const deleteGateway = async (req, res) => {
    try {
        const id = req.params.id;

        // validar el id antes de intentar eliminar
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "Error Id: el formato del id no es valido",
            });
        }

        const data = await dbDeleteGateway(id);

        // si no encontro nada para eliminar
        if (!data) {
            return res.status(404).json({
                msg: "No se puede eliminar una pasarela que no existe",
            });
        }

        res.status(200).json({
            msg: "Pasarela eliminada correctamente",
            data: data,
            id: id,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            msg: "No se pudo eliminar la pasarela",
        });
    }
};

export { getGateways, getGatewayById, postGateway, patchGateway, deleteGateway };
