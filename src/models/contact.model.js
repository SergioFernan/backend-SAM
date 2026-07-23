import { Schema, model } from "mongoose";

// 1. Definir esquema
const ContactSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    correo: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        trim: true
    },
    motivo: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});

// 2. Definir el modelo
const ContactModel = model(`Contacts`, ContactSchema);

export default ContactModel;
