import mongoose from "mongoose";
import {
    dbCreateTicket,
    dbGetTickets,
    dbGetTicketById,
    dbGetTicketsByUserId,
    dbDeleteTicket,
    dbUpdateTicket
} from "../services/ticket.services.js";

const getTickets = async (req, res) => {
    try {
        const data = await dbGetTickets();
        res.status(200).json({
            msj: 'Tickets obtenidos correctamente',
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'No se pudieron obtener los tickets'
        });
    }
};

const getTicketById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'El formato del id no es válido'
            });
        }

        const data = await dbGetTicketById(id);

        if (!data) {
            return res.status(404).json({
                msg: 'Ticket no encontrado'
            });
        }

        res.status(200).json({
            msj: 'Ticket obtenido correctamente',
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'No se pudo obtener el ticket'
        });
    }
};

const getTicketsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                msg: 'El formato del userId no es válido'
            });
        }

        const data = await dbGetTicketsByUserId(userId);
        res.status(200).json({
            msj: 'Tickets del usuario obtenidos correctamente',
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'No se pudieron obtener los tickets del usuario'
        });
    }
};

const postTicket = async (req, res) => {
    try {
        const inputData = req.body;
        const data = await dbCreateTicket(inputData);
        res.status(201).json({
            msj: 'Ticket creado correctamente',
            data: data
        });
    } catch (error) {
        console.error(error);

        if (error.name === 'NotFoundError') {
            return res.status(404).json({
                msg: error.message
            });
        }

        if (error.name === 'AvailabilityError') {
            return res.status(400).json({
                msg: error.message
            });
        }

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                msg: 'Error de validación',
                errors: Object.values(error.errors).map(e => e.message)
            });
        }

        res.status(500).json({
            msg: 'No se pudo crear el ticket'
        });
    }
};

const patchTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const inputData = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'El formato del id no es válido'
            });
        }

        const data = await dbUpdateTicket(id, inputData);

        if (!data) {
            return res.status(404).json({
                msg: 'Ticket no encontrado para actualizar'
            });
        }

        res.status(200).json({
            msg: 'Ticket actualizado correctamente',
            data: data
        });
    } catch (error) {
        console.error(error);

        if (error.name === 'CastError') {
            return res.status(400).json({
                msg: 'Id incorrecto, no se pudo actualizar'
            });
        }

        res.status(500).json({
            msg: 'No se pudo actualizar el ticket'
        });
    }
};

const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'El formato del id no es válido'
            });
        }

        const data = await dbDeleteTicket(id);

        if (!data) {
            return res.status(404).json({
                msg: 'Ticket no encontrado para eliminar'
            });
        }

        res.status(200).json({
            msg: 'Ticket eliminado correctamente',
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'No se pudo eliminar el ticket'
        });
    }
};

export { getTickets, getTicketById, getTicketsByUserId, postTicket, patchTicket, deleteTicket };