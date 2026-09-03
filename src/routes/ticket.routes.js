import { Router } from "express";
import { getTickets, getTicketById, getTicketsByUserId, postTicket, patchTicket, deleteTicket } from "../controllers/ticket.controller.js";
import { authenticationUser } from "../middlewares/authentication.middleware.js";

const router = Router();

router.get('/', getTickets);
router.post('/', authenticationUser, postTicket);
router.get('/user/:userId', getTicketsByUserId);
router.get('/:id', getTicketById);
router.patch('/:id', authenticationUser, patchTicket);
router.delete('/:id', authenticationUser, deleteTicket);

export default router;