import { Router } from "express";
import { deleteLocations, getLocations, postLocations, putLocations } from "../controllers/location.controller.js";

const router = Router();

// Definicion de las rutas de locations
router.get("/", getLocations);
router.post("/", postLocations);
router.put("/:id", putLocations);
router.delete("/:id", deleteLocations);

export default router;
