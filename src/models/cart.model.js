import { Schema, model } from 'mongoose';

const CartSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        unique: true,
        required: true
    },

    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: [true, 'El carrito necesita un producto']
        },
        quantity: {
            type: Number,
            required: [true, 'Se necesita la cantidad de productos'],
            min: [1, 'Se necesita al menos un producto en el carrito']
        }
    }]

},{
    versionKey: false,
    timestamps: true
});

const CartModel = model('cart', CartSchema);

export default CartModel;
