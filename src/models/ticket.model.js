import { Schema, model } from "mongoose";

const TicketSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        default: 0,

    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Disponible",
        enum: ["Comprada", "Cancelada", "agotada", "Pendiente"]
    },
    stock: {
        type: String,
        default: 1i        
    }
},{

});

const TicketModel = model(
    'ticket',
    TicketSchema
);

export default TicketModel;