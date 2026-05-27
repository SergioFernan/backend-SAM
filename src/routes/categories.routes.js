import { Router } from "express";

const app = Router();

import { deleteCategory, getCategory, postCategory, patchCategory } from "../controllers/categories.controller.js";


//Definir rutas:

app.get('/', getCategory);
app.post('/', postCategory);
app.patch('/:id', patchCategory);
app.delete('/:id', deleteCategory);

export default app;