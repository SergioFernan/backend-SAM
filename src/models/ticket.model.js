import { Schema, model } from "mongoose";

const TicketSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
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
        type: Number,
        default: 1        
    }
},{

});

const TicketModel = model(
    'ticket',
    TicketSchema
);

export default TicketModel;