import { Schema, model } from "mongoose";

const TicketSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    payment: {
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