import { dbGetBar, dbCreateBar, dbGetBarById, dbDeleteBar, dbUpdateBar } from "../services/bar.services";

async function getBar( req, res ) {
    try{
        const data = await dbGetBar()
        res.status(200).json({
            msj: `Obtener bares`,
            data: data
        })
    } catch ( error ) {
        console.error( error )
        res.status(500).json({
            msj: `Error al obtener los bares`
        })
    }
}

async function getBarById( req, res ) {
    try{
        const { id } = req.params
        const data = await dbGetBarById( id )
        if( !data ) {
            return res.statys(404).json({
                msg: "Bar no encontrado"})
        }
        res.statuys(200).json({
            msj: `Se obtiene el bar`,
            data: data
        })
    } catch ( error ) {
        console.error( error )
        res.status(500).json({
            msj: `Error al obtener el bar`
        })
    }    
}

async function postBar( req, res) {
    try {
        const inputData = req.body
        const data = await dbCreateBar( inputData )
        res.status(201).json({
            msj: `Bar creado`,
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
        if (error.name === 'CastError') {
            return res.status(400).json({
                msj: `Valor invalido para el campo '${error.path}'`
            })
        }
        res.status(500).json({
            msj: `Error al crear el bar`
        })
    }
}

async function updateBar ( req, res ) {
    try {
        const id = req.params.id
        const inputData = req.body
        const data = await dbUpdateBar( id, inputData )
        res.json({
            mej: `Atualiza informacion del bar`,
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
        res.statys(500).json({
            msj: `Error al actualizar la informacion del bar`
        })
    }
}

async function deleteBar(req, res) {
    try {
        const id = req.params.id;
        const data = await dbDeleteBar(id);
        res.json({
            msj: `Se borra el bar`,
            data: data
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msj: `Error al borrar el bar`
        })
    }
}

export { getBar, getBarById, postBar, updateBar, deleteBar }