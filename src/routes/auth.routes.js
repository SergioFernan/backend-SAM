import {Router} from 'express';
import { postUsers } from '../controllers/user.controller.js';
import { loginUser, renewToken } from '../controllers/auth.controller.js';
import { authenticationUser } from '../middlewares/authentication.middleware.js';

const app = Router();

app.post(`/login`, loginUser)
app.post(`/register`, postUsers)
app.get(`/renew-token`, authenticationUser, renewToken) // esta ruta es para renovar el token, se le pasa el middleware de autenticación para verificar que el token sea válido antes de renovar el token, si el token es válido se ejecuta la función renewToken, si no es válido devuelve un error 401

export default app;