import {Router} from "express";
import { postUsers } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/auth.controller.js";

const router = Router();

//define las rutas que manejan el flujo de autenticación, como login, registro, etc.
// login, register, logout, remember password, doble factor authentication, desactivar cuenta, etc.

// /login/
router.post('/login', loginUser); // ruta para iniciar sesión http://localhost:3000/api/auth/login


// /register/
router.post('/register', postUsers); // registrar un nuevo usuario http://localhost:3000/api/auth/register


export default router;