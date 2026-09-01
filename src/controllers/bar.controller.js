import { dbGetBar, dbCreateBar, dbGetBarById, dbGetBarByUserId, dbDeleteBar, dbUpdateBar } from "../services/bar.services.js";

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
            return res.status(404).json({
                msg: "Bar no encontrado"})
        }
        res.status(200).json({
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
        // Si el usuario está autenticado, asignarle el bar automáticamente
        if (req.user && req.user._id) {
            inputData.userId = req.user._id;
        }

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
        res.status(500).json({
            msj: `Error al crear el bar`
        })
    }
}

async function updateBar ( req, res ) {
    try {
        const id = req.params.id
        const inputData = req.body

        // Validación de permisos: verificar que el usuario sea el dueño del bar o sea ADMIN
        if (req.user) {
            const bar = await dbGetBarById(id);
            if (!bar) {
                return res.status(404).json({ msj: "Bar no encontrado" });
            }
            // `dbGetBarById` hace populate de userId, por lo que usamos bar.userId._id
            if (req.user.role !== 'ADMIN' && bar.userId && bar.userId._id.toString() !== req.user._id.toString()) {
                return res.status(403).json({ msj: "No tienes permiso para actualizar la información de este bar" });
            }
        }

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
        res.status(500).json({
            msj: `Error al actualizar la informacion del bar`
        })
    }
}

async function deleteBar(req, res) {
    try {
        const id = req.params.id;

        // Validación de permisos
        if (req.user) {
            const bar = await dbGetBarById(id);
            if (!bar) {
                return res.status(404).json({ msj: "Bar no encontrado" });
            }
            if (req.user.role !== 'ADMIN' && bar.userId && bar.userId._id.toString() !== req.user._id.toString()) {
                return res.status(403).json({ msj: "No tienes permiso para eliminar este bar" });
            }
        }

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

async function getBarByUserId( req, res ) {
    try{
        const { userId } = req.params
        const data = await dbGetBarByUserId( userId )
        if( !data ) {
            return res.status(404).json({
                msg: "No se encontró un bar asociado a este usuario"})
        }
        res.status(200).json({
            msj: `Se obtiene el bar del usuario`,
            data: data
        })
    } catch ( error ) {
        console.error( error )
        res.status(500).json({
            msj: `Error al obtener el bar del usuario`
        })
    }    
}

export { getBar, getBarById, getBarByUserId, postBar, updateBar, deleteBar }