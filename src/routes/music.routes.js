import { Router } from "express";
import { createMusicController, getAllMusicController, dbGetMusicByIdController, updateMusicController, deleteMusicController } from "../controllers/music.controller.js";

const router = Router();

router.post("/", createMusicController);
router.get("/", getAllMusicController);
router.get("/:id", dbGetMusicByIdController);
router.patch("/:id", updateMusicController);
router.delete("/:id", deleteMusicController);

export default router;