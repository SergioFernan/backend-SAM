
import { insertEvent } from "../services/events.services.js";

const getEvents = (req, res) => {
    res.json({
        msg: `Listar Eventos`
    });

}

const postEvents = async (req, res) => {
    try {
        const imputData = req.body; // Obtengo los datos enviados en la peticion 


        const data = await insertEvent(imputData); // Registra usando el modelo y guarda la respuesta en la constante data.  

        res.json({
            msj: `crea Evento`,
            data: data //Respondemos al cliente enviando los datos registrados. 
        })
    } catch (error) {
        console.error( error );

        res.status(201).json({
            msg: "Mensaje de error"
        })

    }
}

const putEvents = (req, res) => {
    res.json({
        msj: `actualzar Evento`
    })
}

const deleteEvents = (req, res) => {
    res.json({
        msj: `borrar Evento`
    })
}



export {
    getEvents, postEvents, putEvents, deleteEvents
}