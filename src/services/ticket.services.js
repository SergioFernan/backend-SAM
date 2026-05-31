import TicketModel from "../models/ticket.model.js";  

const dbCreateTicket = async (newTicket) => {

    return await TicketModel.create(newTicket);
};

const dbGetTicket = async () => {

    return await TicketModel.diffIndexes();
};

const dbDeleteTicket = async (id) => {

    return await TicketModel.findByIdAndDelete(id);
};

const dbGetTicketById = async (id) => {

    return await TicketModel.findOne({_id: id});
};

const dbUpDateTicket = async (id, inputData) => {

    console.log({id, inputData});
    return await TicketModel.findByIdAndUpdate(id, inputData, {new: true})
}

export {
    dbCreateTicket,
    dbGetTicket,
    dbDeleteTicket,
    dbGetTicketById,
    dbUpDateTicket
};