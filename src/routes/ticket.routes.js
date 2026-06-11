import { Router } from "express";
import { deleteTicket, patchTicket, postTicket, getTicket, getTicketById } from "../controllers/ticket.controller.js";
import { authenticationUser } from "../middlewares/authentication.middleware.js";
const router = Router ();

router.get('/', getTicket);
router.post('/', authenticationUser, postTicket);
router.get('/:id', getTicketById);
router.patch('/:id', authenticationUser, patchTicket);
router.delete('/:id', authenticationUser, deleteTicket);

export default router;