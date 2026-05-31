import { Router } from "express";

const router = Router ();

import { deleteTicket, patchTicket, postTicket, getTicket, getTicketById } from "../controllers/ticket.controller.js";

router.get('/', getTicket);
router.post('/', postTicket);
router.get('/:id', getTicketById),
router.patch('/:id', patchTicket),
router.delete('/:id', deleteTicket);

export default router;