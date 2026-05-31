import { Schema, model } from "mongoose";

const TicketSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: "Pendiente",
        enum: ["Comrada", "Cancelada"]
    }
},{

});

const TicketModel = model(
    'ticket',
    TicketSchema
);

export default TicketModel;