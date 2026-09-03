import { Schema, model } from "mongoose";

const TicketSchema = new Schema({
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Events',
        required: [true, "El evento es obligatorio"]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: [true, "El usuario es obligatorio"]
    },
    quantity: {
        type: Number,
        required: [true, "La cantidad es obligatoria"],
        min: [1, "Debe comprar al menos 1 boleta"]
    },
    zone: {
        type: String,
        required: [true, "La zona es obligatoria"],
        enum: ['General', 'VIP', 'BackStage', 'Palco']
    },
    totalPrice: {
        type: Number,
        required: [true, "El precio total es obligatorio"],
        min: 0
    },
    status: {
        type: String,
        enum: ['Comprada', 'Cancelada', 'Pendiente'],
        default: 'Comprada'
    }
}, {
    versionKey: false,
    timestamps: true
});

const TicketModel = model('ticket', TicketSchema);

export default TicketModel;