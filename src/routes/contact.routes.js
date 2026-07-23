import { Router } from "express";
import { deleteContact, getContact, getContacts, postContact, putContact } from "../controllers/contact.controller.js";
import { authenticationUser } from "../middlewares/authentication.middleware.js";

const router = Router();

// Definicion de las rutas de contacto
router.get("/", authenticationUser, getContacts);
router.get("/:id", authenticationUser, getContact);
router.post("/", postContact);
router.put("/:id", authenticationUser, putContact);
router.delete("/:id", authenticationUser, deleteContact);

export default router;
