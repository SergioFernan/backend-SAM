import { Router } from "express";
import { getUsers, postUsers, putUsers, deleteUser } from "../controllers/user.controller.js";

const app = Router();

//definicion de las rutas de user
// rutea desde ../controllers/user.controller.js la funcion con el json
app.get(`/`, getUsers)

app.post(`/`, postUsers)

app.put(`/`, putUsers)

app.delete(`/`, deleteUser)

export default app;