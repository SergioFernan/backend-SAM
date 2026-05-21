const getEvents = (req, res) => {
    res.json({
        msg: `Listar Eventos`
    });

}

const postEvents = (req, res)  => {
    res.json({
        msj: `crea Evento`
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