import { Router } from "express";
import { getEvents, getEventById, postEvents, updateEvents, deleteEvent } from "../controllers/events.controller.js";
import { authenticationUser } from "../middlewares/authentication.middleware.js";

const app = Router();

app.get(`/`, getEvents);

app.get(`/:id`, getEvent);
app.post(`/`, postEvents);
app.patch(`/:id`, updateEvents);
app.delete(`/:id`, deleteEvent);


export default app;