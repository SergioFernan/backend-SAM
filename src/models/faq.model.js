import { Schema, model } from "mongoose";

// 1. Definir esquema
const FaqSchema = new Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    answer: {
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
const FaqModel = model(`Faqs`, FaqSchema);

export default FaqModel;
