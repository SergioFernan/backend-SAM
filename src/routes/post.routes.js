import { Router } from "express";
import {
    getPosts,
    getPostById,
    postPost,
    patchPost,
    deletePost,
} from "../controllers/post.controller.js";
import { authenticationUser } from "../middlewares/authentication.middleware.js";

const router = Router();

router.get("/", getPosts);                            // obtener todos los posts
router.post("/", postPost);       // crear un post (requiere autenticacion)
router.get("/:id", getPostById);                      // obtener un post por id
router.patch("/:id", authenticationUser, patchPost);  // actualizar un post (requiere autenticacion)
router.delete("/:id", authenticationUser, deletePost);// eliminar un post (requiere autenticacion)

export default router;

