import { Router } from "express";
import { deleteBar, getBar, getBarById, postBar, updateBar } from "../controllers/bar.controller.js";
import { authenticationUser } from "../middlewares/authentication.middleware.js";
import { authorizationUser } from "../middlewares/authorization.middleware.js";
import { ROLES } from "../config/global.config.js";

const app = Router()

app.get(`/`, getBar)
app.post(
    `/`, 
    // [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.USER])], 
    postBar
)
app.get(`/:id`, getBarById)
app.patch(
    `/:id`, 
    // [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.USER])], 
    updateBar
)
app.delete(
    `/:id`, 
    // [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.USER])], 
    deleteBar
)

export default app


