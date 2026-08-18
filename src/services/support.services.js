import { SupportModel } from "../models/support.model.js";

const dbCreateSupportTicket = async (ticketData) => {
    return await SupportModel.create(ticketData);
};

export { dbCreateSupportTicket };
