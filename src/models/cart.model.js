import { Schema, model } from 'mongoose';

const CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'El usuario es obligatorio para el carrito']
    },
    items: [{
        eventId: {
            type: Schema.Types.ObjectId,
            ref: 'Events',
            required: [true, 'El evento es obligatorio']
        },
        zone: {
            type: String,
            enum: ['General', 'VIP', 'BackStage', 'Palco'],
            required: [true, 'La zona es obligatoria']
        },
        quantity: {
            type: Number,
            required: [true, 'La cantidad es obligatoria'],
            min: [1, 'Se necesita al menos 1 boleta']
        },
        unitPrice: {
            type: Number,
            required: [true, 'El precio unitario es obligatorio'],
            min: 0
        }
    }],
    totalPrice: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    }
}, {
    versionKey: false,
    timestamps: true
});

const CartModel = model('cart', CartSchema);

export default CartModel;
