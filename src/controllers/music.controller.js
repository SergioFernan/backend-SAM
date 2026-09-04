import { dbCreateMusic, dbGetAllMusic, dbGetMusicById, dbUpdateMusic, dbDeleteMusic } from "../services/music.service.js";

// 1. Crea la cancion en la base de datos 
const createMusicController = async (req, res) => {
    try {
        const { name, artist, imageUrl, youtubeUrl, genre } = req.body;
        if (!name || !imageUrl) {
            return res.status(400).json({
                msg: "El nombre y la URL de la imagen son obligatorios"
            });
        }
        const newMusic = await dbCreateMusic({ name, artist, imageUrl, youtubeUrl, genre });
        return res.status(201).json({
            msg: "Canción agregada a la base de datos",
            data: newMusic
        });
    } catch (error) {
        console.error("Error al agregar canción", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                msg: "Error de validación",
                errors: Object.values(error.errors).map(e => e.message)
            });
        }
        return res.status(500).json({
            msg: "No se pudo agregar la canción",
            error: error.message
        });
    }
};

// 2. Obtiene todas las canciones activas de la base de datos
const getAllMusicController = async (req, res) => {
    try {
        const musicList = await dbGetAllMusic();
        return res.status(200).json({ data: musicList });
    } catch (error) {
        console.error("Error al obtener canciones", error);
        return res.status(500).json({
            msg: "No se pudo obtener las canciones",
            error: error.message
        });
    }
}

//3. Obtener una sola por ID 
const dbGetMusicByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const music = await dbGetMusicById(id);
        if (!music) {
            return res.status(404).json({ msg: "Música no encontrada" });
        }
        return res.status(200).json({ data: music });
    } catch (error) {
        console.error("Error al obtener canción", error);
        return res.status(500).json({
            msg: "No se pudo obtener la canción",
            error: error.message
        });
    }
}

// 4. Actualiza una cancion (acepta campos parciales)
const updateMusicController = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ msg: "No se enviaron campos para actualizar" });
        }

        const updatedMusic = await dbUpdateMusic(id, updateData);

        if (!updatedMusic) {
            return res.status(404).json({ msg: "Música no encontrada para actualizar" });
        }
        return res.status(200).json({ msg: "Música actualizada", data: updatedMusic });
    } catch (error) {
        console.error("Error al actualizar la música:", error);
        return res.status(500).json({ msg: "Error interno del servidor", error: error.message });
    }
}

// 5. elimina una cancion
const deleteMusicController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMusic = await dbDeleteMusic(id);
        if (!deletedMusic) {
            return res.status(404).json({
                msg: "Música no encontrada para eliminar"
            });
        }
        return res.status(200).json({
            msg: "Música eliminada correctamente"
        });

    }
    catch (error) {
        console.error("Error al eliminar canción", error);
        return res.status(500).json({
            msg: "No se pudo eliminar la canción",
            error: error.message
        });
    }
}

export {
    createMusicController,
    getAllMusicController,
    dbGetMusicByIdController,
    updateMusicController,
    deleteMusicController
}

