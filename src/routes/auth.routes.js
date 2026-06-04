import {Router} from 'express';
import { postUsers } from '../controllers/user.controller.js';
import { loginUser } from '../controllers/auth.controller.js';

const app = Router();

app.post(`/login`, loginUser)
app.post(`/register`, postUsers)

export default app;