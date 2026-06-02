import { Schema, model } from "mongoose";

// 1. Definir esquema
const LocationSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    capacity: {
        type: Number,
        default: 0,
        min: 0, 
    },
    status: {
        type: Boolean,
        default: true
    },
    ownerUserId: {  
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    registerUserId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

// 2. Definir el modelo
const LocationModel = model(`Locations`, LocationSchema);

export default LocationModel;
