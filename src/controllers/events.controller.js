import { dbGetEvents, dbGetEventById, dbCreateEvent, dbDeleteEvent, dbUpdateEvent } from "../services/events.services.js";

// async function getEvents(req, res) {
//     try {
//         const data = await dbGetEvents();
//         res.status(200).json({
//             msj: `obtener eventos`,
//             data: data
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             msj: `error al obtener eventos`
//         });
//     }
// }

async function getEvents(req, res) {
    try {
        // Extraer parámetros de query string con valores por defecto
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const isFeatured = req.query.isFeatured === 'true'; // Convierte el string 'true' a booleano
        const sortByField = req.query.sortByField || 'initialDate';

        // Ejecutar el servicio pasándole los parámetros parseados
        const result = await dbGetEvents({
            page,
            limit,
            isFeatured,
            sortByField
        });

        res.status(200).json({
            msj: 'Eventos obtenidos con éxito',
            data: result.data,
            pagination: result.pagination
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msj: 'Error al obtener eventos',
            error: error.message
        });
    }
}

async function getEventById(req, res) {
    try {
        const { id } = req.params;
        const data = await dbGetEventById(id);
        if (!data) {
            return res.status(404).json({ msj: "evento no encontrado" });
        }
        res.status(200).json({
            msj: `obtener evento`,
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msj: `error al obtener evento`
        });
    }
}

async function postEvents(req, res) {
    try {
        const inputData = req.body;
        const data = await dbCreateEvent(inputData);
        res.status(201).json({
            msj: `evento creado`,
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
            msj: `error al crear evento`
        })
    }
}

async function updateEvents(req, res) {
    try {
        const id = req.params.id;
        const inputData = req.body;
        const data = await dbUpdateEvent(id, inputData);
        res.json({
            msj: `actualizar evento`,
            data: data
        })
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
            msj: `error al actualizar evento`
        })
    }
}

async function deleteEvent(req, res) {
    try {
        const id = req.params.id;
        const data = await dbDeleteEvent(id);
        res.json({
            msj: `borrar evento`,
            data: data
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msj: `error al borrar evento`
        })
    }
}

export { getEvents, getEventById, postEvents, updateEvents, deleteEvent };