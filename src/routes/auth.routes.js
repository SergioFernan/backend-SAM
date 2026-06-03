import {Router} from 'express';
import { postUsers } from '../controllers/user.controller.js';

const app = Router();

app.post(`/register`, postUsers)

export default app;