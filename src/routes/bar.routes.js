import { Router } from "express";
import { deleteBar, getBar, getBarById, getBarByUserId, postBar, updateBar } from "../controllers/bar.controller.js";
import { authenticationUser } from "../middlewares/authentication.middleware.js";
import { authorizationUser } from "../middlewares/authorization.middleware.js";
import { ROLES } from "../config/global.config.js";

const app = Router()

app.get(`/`, getBar)
app.post(
    `/`, 
    [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.USER, ROLES.BAR])], 
    postBar
)
app.get(`/user/:userId`, getBarByUserId)
app.get(`/:id`, getBarById)
app.patch(
    `/:id`, 
    [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.USER, ROLES.BAR])], 
    updateBar
)
app.delete(
    `/:id`, 
    [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.USER, ROLES.BAR])], 
    deleteBar
)

export default app


