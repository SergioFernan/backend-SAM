import { dbCreateSupportTicket } from "../services/support.services.js";

const postSupport = async (req, res) => {
    try {
        const inputData = req.body;
        const result = await dbCreateSupportTicket(inputData);
        res.status(201).json({ msg: "Ticket de soporte creado exitosamente", data: result });
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: "Error al crear ticket de soporte", error: e.message });
    }
};

export { postSupport };
