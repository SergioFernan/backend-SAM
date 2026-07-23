import { Router } from "express";
import { deleteFaqs, getFaq, getFaqs, postFaqs, putFaqs } from "../controllers/faq.controller.js";
import { authenticationUser } from "../middlewares/authentication.middleware.js";

const router = Router();

// Definicion de las rutas de faqs
router.get("/", getFaqs);
router.get("/:id", getFaq);
router.post("/", authenticationUser, postFaqs);
router.put("/:id", authenticationUser, putFaqs);
router.delete("/:id", authenticationUser, deleteFaqs);

export default router;
