import { mongoose } from "mongoose";
import TicketModel from "../models/ticket.model.js";
import { dbCreateTicket, dbDeleteTicket, dbGetTicket, dbUpDateTicket, dbGetTicketById } from "../services/ticket.services.js";



const getTicket = async (req, res) => {

    try {

        const data = await dbGetTicket()

        res.status(201).json({
            msj: 'Name of Event',
            data: data
        });
        
    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: 'No se pudo obtener el evento'
        });
        
    };
};




const postTicket = async (req, res) => {
   
    try {
        const inputData = req.body;

        const data = await dbCreateTicket(inputData);

        res.status(201).json({
            data: data
        });
        
    } catch (error) {

    console.error(error.code);
    
    if( error.code === 11000 );
        return res.json({
            msg: 'Error: Ese ticket ya existe.'
        });       
    };

    res.status(500).json({
        msg: 'No se pudo registrar el ticket.'
    });
};




const getTicketById = async (req, res) => {

    try {
        const id = req.params.id;

        if(!mongoose.Types.objectId.isValid(id)) {

            return res.status(400).json({
                msg: 'Error Id: No se encontró el Ticket.'
            });
        };

        const data = await dbGetTicketById(id);

        if( ! data ) {
            return res.json ({
                msg: 'Error Id: El Id no existe'
            });
        };
        
        res.status(200).json ({
            data: data
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            msg: 'Error: No se encontró el Id del Ticket.'
        });        
    };
};




const patchTicket = async (req,res) => {

    try {

        const id = req.params.id;
        const inputData = req.body;

        const data = await dbUpDateTicket(id, inputData);

        res.status(200).json({
            msg: 'Update Ticket',
            data: data
        });
        
    } catch (error) {
        console.error(error);

        if (error.name === 'CastError') {

            return res.status(400).json({
                msg: 'Error Id: No pudo actualizar la información, Id incorrecto.'
            });
        };
        
        res.status(500).json({
            msg: 'No se pudo actualizar la información'
        });
    };
};




const deleteTicket = async (req, res) => {

    try {
        
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({})
        };

        const data = await dbDeleteTicket(id);

        if (! data) {
            return res.json ({
                msg: 'No se pude eliminar un Ticket que no ha sido registrafo.'
            });
        };

        res.status(200).json({
            msg: 'Delete Ticket',
            data: data,
            id: id
        });

    } catch (error) {

        console.error(error);
        
        res.status(500).json({
            msg: 'No se pudo borrar el Ticket'
        });
    };
};

export { getTicket, postTicket, patchTicket, deleteTicket, getTicketById};