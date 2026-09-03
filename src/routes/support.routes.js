import { Router } from "express";
import { postSupport } from "../controllers/support.controller.js";

const router = Router();

router.post('/', postSupport);

export default router;
