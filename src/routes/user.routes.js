import { Router } from "express";
import { getUsers, postUsers, updateUsers, deleteUser, getUserById } from "../controllers/user.controller.js";
import { authenticationUser } from "../middlewares/authentication.middleware.js";

const app = Router();

//definicion de las rutas de user
// rutea desde ../controllers/user.controller.js la funcion con el json
app.get(`/`, getUsers)
app.post(`/`,
    //authenticationUser//, 
    postUsers)
app.get(`/:id`, getUserById)
// TODO: restaurar authenticationUser cuando el login esté implementado
app.patch(`/:id`, /* authenticationUser, */ updateUsers)
app.delete(`/:id`, /* authenticationUser, */ deleteUser)


export default app;