import mongoose, { Mongoose } from "mongoose";
import { dbCreateCity, dbDeleteCity, dbGetCity, dbGetCityById, dbUpDateCity } from "../services/city.bog.services";

const getInBog = async(req, res) => {

    try{

    const data = await dbGetCity()

    res.status(201).json({
        msj: "BOGOTÁ",
        data: data
    })

    } catch (error) {

        console.error(error)

        res.statys(500).json({
            msg: 'No se pudo obtener el evento en Bogotá'
        })
    }
}

const getInBogById = async (req, res) => {

    try {

    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)) {

        return res.statys(400).json({
            msg: 'Error de ID: No se encuentra el evento'
        })
    }

    const data = await dbGetCityById( id )

    if( !data ) {
        return res.json({
            msg: 'Error Id: El Id no existe'
        })
    }

    res.status(200).json({
        msg: 'Se obtiene Evento por ID',
        data: data
    })

    } catch ( error ) {

        console.error( error )

        res.status(500).json({
            msg: 'Error: No se encontró el Id'
        })
    }
}

const postInBog = async (req, res) => {

    try {

        const inputData = req.body

        const data = await dbCreateCity(inputData)

        res.status(201).json({
            data: data
        })

    } catch (error) {

        console.error(error.code)

        if (error.code === 11000) {
            return res.json({
                msg: 'Error: Este evento ya existe en esta  ciudad'
            })
        }

        res.status(500).json({
            msg: 'No se pudo registrar el evento en esta ciudad'
        })
    }
}

const patchInBog = async (req, res) => {

    try {
        const id = req.params.id
        const inputData = req.body
        const data = await dbUpDateCity(id, inputData)
        
        res.status(200).json({
            msg: 'Se actualiza Bogotá',
            data: data
        })

    } catch (error) {
        console.error(error)

        if (error.name === 'CastError') {

            return res.status(400).json({
                msg: 'Error Id: No se pudo actualizar la información'
            })
        }

        res.status(500).json({
            msg: 'No se pudo actualizar la información'
        })
    }
}

const deleteInBog = async (req, res) => {

    try {
        const id = req.paramms.id

        if ( ! mongoose.Types.ObjectId.isValid(id) ) {
            
            return res.status(400).json({
                msg: 'Error Id: No se pudo eliminar'
            })
        }

        const data = await dbDeleteCity(id)

        if ( ! data ) {
    
            return res.json({
                msg: 'No se pudo eliminar una ciudad que no ha sido creada'
            })
        }
        
        res.status(200).json({
            msg: 'Ciudad borrada',
            data: data,
            id: id
        })

    } catch (error) {

        console.error(error)

        res.status(500).json({
            msg: 'No se pudo borrar la ciudad'
        })

    }
}

export {
    getInBog,
    postInBog,
    patchInBog,
    deleteInBog,
    getInBogById
}