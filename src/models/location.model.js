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
    createdBy: {
        type: Schema.Types.ObjectId, // El tipo de dato es un ObjectId, que es el tipo de dato que se utiliza para referenciar a otro documento en MongoDB
        ref: 'users', // El nombre del modelo al que se hace referencia, en este caso es el modelo de usuarios, esto permite hacer una relación entre la ubicación y el usuario que la creó
        required: true // Este campo es obligatorio, no se puede crear una ubicación sin un usuario que la haya creado
    }
}, {
    versionKey: false,
    timestamps: true
});

// 2. Definir el modelo
const LocationModel = model(`Locations`, LocationSchema);

export default LocationModel;
