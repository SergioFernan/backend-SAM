import { dbGetLocations, dbGetLocationById, dbCreateLocation, dbDeleteLocation, dbUpdateLocation } from "../services/location.services.js";

const getLocations = async (req, res) => {
    try {
        const data = await dbGetLocations();
        res.status(200).json({
            msj: `obtener lugares`,
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msj: `error al obtener lugares`
        });
    }
}

const getLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await dbGetLocationById(id);
        if (!data) {
            return res.status(404).json({ msj: "lugar no encontrado" });
        }
        res.status(200).json({
            msj: `obtener lugar`,
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msj: `error al obtener lugar`
        });
    }
}

const postLocations = async (req, res) => {
    try {
        const inputData = req.body;
        const data = await dbCreateLocation(inputData);
        res.status(201).json({
            msj: `lugar creado`,
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msj: `error al crear lugar`
        })
    }
}

const putLocations = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;
        const data = await dbUpdateLocation(id, inputData);
        res.json({
            msj: `actualizar lugar`,
            data: data
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msj: `error al actualizar lugar`
        })
    }
}

const deleteLocations = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await dbDeleteLocation(id);
        res.json({
            msj: `borrar lugar`,
            data: data
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msj: `error al borrar lugar`
        })
    }
}

export { getLocations, getLocation, postLocations, putLocations, deleteLocations };
