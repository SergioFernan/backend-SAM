import { Router } from "express";
import { deleteMusic, getmusic, getMusicById, postMusic, updateMusic } from "../controllers/music.controller.js";



const app = Router()

app.get('/', getmusic)
app.post('/', postMusic)
app.get('/:id', getMusicById )
app.patch('/:id', updateMusic)
app.delete('/:id', deleteMusic)

export default app