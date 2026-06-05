import {Router} from 'express';
import { postUsers } from '../controllers/user.controller.js';
import { loginUser, renewToken } from '../controllers/auth.controller.js';
import { authenticationUser } from '../middlewares/authentication.middleware.js';

const app = Router();

app.post(`/login`, loginUser)
app.post(`/register`, postUsers)
app.get(`/renew-token`, authenticationUser, renewToken)

export default app;