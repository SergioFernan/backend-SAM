import mongoose from "mongoose";
import {
    dbCreatePost,
    dbGetPosts,
    dbGetPostById,
    dbUpdatePost,
    dbDeletePost,
} from "../services/post.services.js";

// obtener todos los posts
const getPosts = async (req, res) => {
    try {
        const data = await dbGetPosts();

        res.status(200).json({
            msg: "Posts obtenidos correctamente",
            data: data,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            msg: "No se pudieron obtener los posts",
        });
    }
};

// obtener un post por su id
const getPostById = async (req, res) => {
    try {
        const id = req.params.id;

        // validar que el id tenga el formato correcto de mongo
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "Error Id: el formato del id no es valido",
            });
        }

        const data = await dbGetPostById(id);

        // si no existe el post en la base de datos
        if (!data) {
            return res.status(404).json({
                msg: "Error Id: no se encontro el post con ese id",
            });
        }

        res.status(200).json({
            msg: "Post obtenido correctamente",
            data: data,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            msg: "No se pudo obtener el post",
        });
    }
};

// crear un nuevo post
const postPost = async (req, res) => {
    try {
        const inputData = req.body; // datos que vienen del body del request

        const data = await dbCreatePost(inputData);

        res.status(201).json({
            msg: "Post creado correctamente",
            data: data,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            msg: "No se pudo crear el post",
        });
    }
};

// actualizar un post por su id
const patchPost = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body; // campos a actualizar

        // validar el id antes de consultar la base de datos
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "Error Id: el formato del id no es valido",
            });
        }

        const data = await dbUpdatePost(id, inputData);

        res.status(200).json({
            msg: "Post actualizado correctamente",
            data: data,
        });

    } catch (error) {
        console.error(error);

        // CastError ocurre cuando mongo no puede convertir el id
        if (error.name === "CastError") {
            return res.status(400).json({
                msg: "Error Id: no se pudo actualizar, id incorrecto",
            });
        }

        res.status(500).json({
            msg: "No se pudo actualizar el post",
        });
    }
};

// eliminar un post por su id
const deletePost = async (req, res) => {
    try {
        const id = req.params.id;

        // validar el id antes de intentar eliminar
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "Error Id: el formato del id no es valido",
            });
        }

        const data = await dbDeletePost(id);

        // si no encontro nada para eliminar
        if (!data) {
            return res.status(404).json({
                msg: "No se puede eliminar un post que no existe",
            });
        }

        res.status(200).json({
            msg: "Post eliminado correctamente",
            data: data,
            id: id,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            msg: "No se pudo eliminar el post",
        });
    }
};

export { getPosts, getPostById, postPost, patchPost, deletePost };
