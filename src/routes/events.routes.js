import { Router } from "express";
import { deleteEvents, getEvents, postEvents, putEvents } from "../controllers/events.controller.js";

const router = Router();

//definicion de las rutas de user
// rutea desde ../controllers/user.controller.js la funcion con el json
router.get(`/`, getEvents );
router.post(`/`, postEvents);
router.put(`/`, putEvents);
router.delete(`/`, deleteEvents);

export default router;