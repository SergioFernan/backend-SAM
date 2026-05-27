import { Router } from "express";

const app = Router();

import { deleteCategory, getCategory, postCategory, putcategory } from "../controllers/categories.controller.js";


//Definir rutas:

app.get('/', getCategory);
app.post('/', postCategory);
app.put('/', putcategory);
app.delete('/:id', deleteCategory);

export default app;