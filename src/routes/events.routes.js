import { Router } from "express";
import { getEvents, getEventById, getEventsByBar, postEvents, updateEvents, deleteEvent } from "../controllers/events.controller.js";
import { authenticationUser } from "../middlewares/authentication.middleware.js";
import { authorizationUser } from "../middlewares/authorization.middleware.js";
import { ROLES } from "../config/global.config.js";
const app = Router();

app.get(`/`, getEvents);



app.get(`/bar/:barId`, getEventsByBar);
app.get(`/:id`, getEventById);

app.post(`/`, [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.BAR])], postEvents);
app.patch(`/:id`, [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.BAR])], updateEvents);
app.delete(`/:id`, [authenticationUser, authorizationUser([ROLES.ADMIN, ROLES.BAR])], deleteEvent);


export default app;