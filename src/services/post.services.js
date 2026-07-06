import { PostModel } from "../models/post.model.js";

// crear un nuevo post en la base de datos
const dbCreatePost = async (newPost) => {
    return await PostModel.create(newPost);
};

// obtener todos los posts, trayendo info del autor y del evento relacionado
const dbGetPosts = async () => {
    return await PostModel.find()
        .populate("author", "name email avatar") // trae nombre, correo y avatar del autor
        .populate("event", "name initialDate");  // trae nombre y fecha del evento si tiene
};

// buscar un post por su id
const dbGetPostById = async (id) => {
    return await PostModel.findById(id)
        .populate("author", "name email avatar")
        .populate("event", "name initialDate");
};

// actualizar un post por su id
// { new: true } para que devuelva el documento ya actualizado
const dbUpdatePost = async (id, inputData) => {
    return await PostModel.findByIdAndUpdate(id, inputData, { new: true });
};

// eliminar un post por su id
const dbDeletePost = async (id) => {
    return await PostModel.findByIdAndDelete(id);
};

export {
    dbCreatePost,
    dbGetPosts,
    dbGetPostById,
    dbUpdatePost,
    dbDeletePost,
};
