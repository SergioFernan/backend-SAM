import { Router } from "express";
import { getEvents, getEvent, postEvents, updateEvents, deleteEvent } from "../controllers/events.controller.js";
import { authenticationUser } from "../middlewares/authentication.middleware.js";

const app = Router();

app.get(`/`, getEvents);
app.get(`/:id`, getEvent);
app.post(`/`, authenticationUser, postEvents);
app.patch(`/:id`, authenticationUser, updateEvents);
app.delete(`/:id`, authenticationUser, deleteEvent);

export default app;