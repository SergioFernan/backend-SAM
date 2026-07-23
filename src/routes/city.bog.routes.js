import { Router } from "express";
import { getEvent } from "../controllers/events.controller";
import { deleteInBog, getInBog, getInBogById, patchInBog, postInBog } from "../controllers/city.bog.controller";


const app = Router();

app.get('/', getInBog)
app.post('/', postInBog)
app.post('/:id', getInBogById)
app.patch('/', patchInBog)
app.delete('/', deleteInBog)

export default app

