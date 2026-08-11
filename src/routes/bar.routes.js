import { Router } from "express";
import { deleteBar, getBar, getBarById, postBar, updateBar } from "../controllers/bar.controller";
import { authenticationUser } from "../middlewares/authentication.middleware";

const app = Router()

app.get(`/`, getBar)
app.get(`/:id`, getBarById)
app.post(`/`, authenticationUser, postBar)
app.patch(`/:id`, authenticationUser, updateBar)
app.delete(`/:id`, authenticationUser, deleteBar)

export default app