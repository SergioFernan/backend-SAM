import { Schema, model } from "mongoose";

const TicketSchema = new Schema({

    price: {
        type: Number,
        required: true
    },
    payment: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "Disponible",
        enum: ["Comprada", "Cancelada", "agotada", "Pendiente"]
    },
    stock: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }

}, {

});

const TicketModel = model(
    'ticket',
    TicketSchema
);

export default TicketModel;