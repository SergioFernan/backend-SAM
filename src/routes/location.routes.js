import { Router } from "express";
import { deleteLocations, getLocations, postLocations, putLocations } from "../controllers/location.controller.js";
import { authenticationUser } from "../middlewares/authentication.middleware.js";

const router = Router();

// Definicion de las rutas de locations
router.get("/", getLocations);
router.post("/", authenticationUser, postLocations);
router.put("/:id", authenticationUser, putLocations);
router.delete("/:id", authenticationUser, deleteLocations);

export default router;
