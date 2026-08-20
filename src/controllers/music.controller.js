import { dbCreateMusic, dbGetAllMusic, dbGetMusicById, dbUpdateMusic, dbDeleteMusic } from "../services/music.service.js";

// 1. Crea la cancion en la base de datos 
const createMusicController = async (req, res) => {
    try {
        const { youtubeUrl } = req.body;
        if (!youtubeUrl) {
            return res.status(400).json({
                msg: "la URL de youtube es obligatoria"
            });
        }
        const newMusic = await dbCreateMusic({ youtubeUrl });
        return res.status(201).json({
            msg: "cancion agregada a la base de datos",
            data: newMusic
        });
    } catch (error) {
        console.error("Error al agregar cancion", error);
        return res.status(500).json({
            msg: "no se pudo agregar la cancion",
            error: error.message
        });
    }
};

// 2. Obtiene todas las canciones de la base de datos
const getAllMusicController = async (req, res) => {
    try {
        const musicList = await dbGetAllMusic();
        return res.status(200).json({ data: musicList });
    } catch (error) {
        console.error("Error al obtener canciones", error);
        return res.status(500).json({
            msg: "no se pudo obtener las canciones",
            error: error.message
        });
    }
}

//3. Obtener una sola por ID 
const dbGetMusicByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const music = await dbGetMusicById(id);
        return res.status(200).json({ data: music });
    } catch (error) {
        console.error("Error al obtener cancion", error);
        return res.status(500).json({
            msg: "no se pudo obtener la cancion",
            error: error.message
        });
    }
}
// 4. Actualiza una cancion
const updateMusicController = async (req, res) => {
    try {
        const { id } = req.params;
        const { youtubeUrl } = req.body;
        if (!youtubeUrl) {
            return res.status(400).json({ msg: "La URL de YouTube es obligatoria para actualizar" });
        }
        const updatedMusic = await dbUpdateMusic(id, { youtubeUrl });

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
                msg: "Musica no encontrada para eliminar"
            });
        }
        return res.status(200).json({
            msg: "Musica eliminada correctamente"
        });

    }
    catch (error) {
        console.error("Error al eliminar cancion", error);
        return res.status(500).json({
            msg: "no se pudo eliminar la cancion",
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
