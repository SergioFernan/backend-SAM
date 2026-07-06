import { Router } from "express";
import {
    getGateways,
    getGatewayById,
    postGateway,
    patchGateway,
    deleteGateway,
} from "../controllers/gateway.controller.js";
import { authenticationUser } from "../middlewares/authentication.middleware.js";

const router = Router();

router.get("/", getGateways);                             // obtener todas las pasarelas
router.post("/", authenticationUser, postGateway);        // crear una pasarela (requiere autenticacion)
router.get("/:id", getGatewayById);                       // obtener una pasarela por id
router.patch("/:id", authenticationUser, patchGateway);   // actualizar una pasarela (requiere autenticacion)
router.delete("/:id", authenticationUser, deleteGateway); // eliminar una pasarela (requiere autenticacion)

export default router;
