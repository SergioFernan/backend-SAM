import { Router } from "express";

const app = Router();

import { deleteCategory, getCategory, postCategory, patchCategory, getCategoryById } from "../controllers/categories.controller.js";


//Definir rutas:

app.get('/', getCategory);
app.post('/', postCategory);
app.get('/:id', getCategoryById );
app.patch('/:id', patchCategory);
app.delete('/:id', deleteCategory);

export default app;