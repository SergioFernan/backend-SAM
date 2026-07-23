import { dbGetContacts, dbGetContactById, dbCreateContact, dbDeleteContact, dbUpdateContact } from "../services/contact.services.js";

const getContacts = async (req, res) => {
    try {
        const data = await dbGetContacts();
        res.status(200).json({
            msj: `obtener solicitudes de contacto`,
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msj: `error al obtener solicitudes de contacto`
        });
    }
}

const getContact = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await dbGetContactById(id);
        if (!data) {
            return res.status(404).json({ msj: "solicitud no encontrada" });
        }
        res.status(200).json({
            msj: `obtener solicitud de contacto`,
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msj: `error al obtener solicitud de contacto`
        });
    }
}

const postContact = async (req, res) => {
    try {
        const inputData = req.body;
        const data = await dbCreateContact(inputData);
        res.status(201).json({
            msj: `solicitud de contacto creada`,
            data: data
        });
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                msj: `error de validación`,
                errors: Object.values(error.errors).map(e => e.message)
            });
        }
        if (error.name === 'CastError') {
            return res.status(400).json({
                msj: `valor inválido para el campo '${error.path}'`
            });
        }
        res.status(500).json({
            msj: `error al crear solicitud de contacto`
        });
    }
}

const putContact = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;
        const data = await dbUpdateContact(id, inputData);
        if (!data) {
            return res.status(404).json({ msj: "solicitud no encontrada" });
        }
        res.json({
            msj: `actualizar solicitud de contacto`,
            data: data
        });
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                msj: `error de validación`,
                errors: Object.values(error.errors).map(e => e.message)
            });
        }
        if (error.name === 'CastError') {
            return res.status(400).json({
                msj: `valor inválido para el campo '${error.path}'`
            });
        }
        res.status(500).json({
            msj: `error al actualizar solicitud de contacto`
        });
    }
}

const deleteContact = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await dbDeleteContact(id);
        if (!data) {
            return res.status(404).json({ msj: "solicitud no encontrada" });
        }
        res.json({
            msj: `borrar solicitud de contacto`,
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msj: `error al borrar solicitud de contacto`
        });
    }
}

export { getContacts, getContact, postContact, putContact, deleteContact };
