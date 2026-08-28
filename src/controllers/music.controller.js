import { dbCreateMusic, dbDeleteMusic, dbGetMusic, dbGetMusicById, dbUpdateMusic } from "../services/music.service.js"


async function getmusic( req, res ) {
    try{
        const data = await dbGetMusic()
        res.status(200).json({
            msj: `Obtener musica`,
            data: data
        })
    } catch ( error ) {
        console.error( error )
        res.status(500).json({
            msj: `Error al obtener musica`
        })
    }
}

async function getMusicById( req, res ) {
    try{
        const { id } = req.params
        const data = await dbGetMusicById( id )
        if( !data ) {
            return res.status(404).json({
                msg: "Canción no encontrada"})
        }
        res.status(200).json({
            msj: `Se obtiene la canción`,
            data: data
        })
    } catch ( error ) {
        console.error( error )
        res.status(500).json({
            msj: `Error al obtener la canción`
        })
    }    
}

async function postMusic( req, res) {
    try {
        const inputData = req.body
        const data = await dbCreateMusic( inputData )
        res.status(201).json({
            msj: `Canción creada`,
            data: data
        })
    } catch ( error ) {
        console.error( error )
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                msj: 'Error de validacion',
                errors: Object.values(error.errors).map(e => e.message)
            })
        }        
        res.status(500).json({
            msj: `Error al crear la canción`
        })
    }
}

async function updateMusic ( req, res ) {
    try {
        const id = req.params.id
        const inputData = req.body
        const data = await dbUpdateMusic( id, inputData )
        res.json({
            mej: `Atualiza informacion de la canción`,
            data: data
        })
    } catch ( error ) {
        console.error( error )
        if ( error.name === `ValidationError`) {
            return res.status(400).json({
                msj: `Error de validacion`,
                errors: Object.values(error.errors).map(e => e.message)
            })
        }
        if (error.name === 'CastError') {
            return res.status(400).json({
                msj: `valor invalido para el campo '${error.path}'`
            })
        }
        res.status(500).json({
            msj: `Error al actualizar la informacion de la canción`
        })
    }
}

async function deleteMusic(req, res) {
    try {
        const id = req.params.id;
        const data = await dbDeleteMusic(id);
        res.json({
            msj: `Se ha borrado la canción`,
            data: data
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msj: `Error al borrar la canción`
        })
    }
}

export { getmusic, getMusicById, postMusic, updateMusic, deleteMusic }
