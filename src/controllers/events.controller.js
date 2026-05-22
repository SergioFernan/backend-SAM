import EventModel from "../models/Events.models.js";

const getEvents = (req, res) => {
    res.json({
        msg: `Listar Eventos`
    });

}

const postEvents = async (req, res)  => {
    const imputData = req.body; // Obtengo los datos enviados en la peticion 


   const data = await EventModel.create ( imputData ); // Registra usando el modelo y guarda la respuesta en la constante data.  

    res.json({
        msj: `crea Evento`,
        data: data //Respondemos al cliente enviando los datos registrados. 
    })
}

const putEvents = (req, res)  => {
    res.json({
        msj: `actualzar Evento`
    })
}

const deleteEvents = (req, res)  => {
    res.json({
        msj: `borrar Evento`
    })
}



export {
    getEvents, postEvents, putEvents, deleteEvents
}