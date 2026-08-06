import { Router } from "express";

const app = Router();

import { deleteCategory, getCategory, postCategory, patchCategory, getCategoryById } from "../controllers/categories.controller.js";
import { authenticationUser } from "../middlewares/authentication.middleware.js";

//Definir rutas:

app.get('/', getCategory);
app.post('/', postCategory); // esta ruta es para crear una categoría, se le pasa el middleware de autenticación para verificar que el token sea válido antes de crear la categoría, si el token es válido se ejecuta la función postCategory, si no es válido devuelve un error 401
app.get('/:id', getCategoryById); // esta ruta es para obtener una categoría por id, se le pasa el middleware de autenticación para verificar que el token sea válido antes de obtener la categoría, si el token es válido se ejecuta la función getCategoryById, si no es válido devuelve un error 401
app.patch('/:id', patchCategory); // esta ruta es para actualizar una categoría por id, se le pasa el middleware de autenticación para verificar que el token sea válido antes de actualizar la categoría, si el token es válido se ejecuta la función patchCategory, si no es válido devuelve un error 401
app.delete('/:id', deleteCategory); // esta ruta es para eliminar una categoría por id, se le pasa el middleware de autenticación para verificar que el token sea válido antes de eliminar la categoría, si el token es válido se ejecuta la función deleteCategory, si no es válido devuelve un error 401

export default app;

// authenticationUser