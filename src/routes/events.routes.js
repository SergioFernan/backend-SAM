import { Router } from "express";
import { getEvents, getEvent, postEvents, updateEvents, deleteEvent } from "../controllers/events.controller.js";

const app = Router();

app.get(`/`, getEvents);
app.get(`/:id`, getEvent);
app.post(`/`, postEvents);
app.patch(`/:id`, updateEvents);
app.delete(`/:id`, deleteEvent);

export default app;