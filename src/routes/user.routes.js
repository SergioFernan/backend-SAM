import { Router } from "express";
import { getUsers, postUsers, updateUsers, deleteUser, getUserById } from "../controllers/user.controller.js";

const app = Router();

//definicion de las rutas de user
// rutea desde ../controllers/user.controller.js la funcion con el json
app.get(`/`, getUsers)
app.post(`/`, postUsers)
app.get(`/:id`, getUserById)
app.patch(`/:id`, updateUsers)
app.delete(`/:id`, deleteUser)


export default app;