import { Schema, model } from "mongoose";

// 1ra parte: Definir el esquema

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        default: 0,
        min: 0,
    },
    stock: {
        type: Number,
        default: 1, 
        min: 1
    }
    
},{});

// 2da parte: Definir el modelo 

const CagoryModel = model(
    'Festivals',                // Define el nombre de la collección que almacenará el objeto creado con este schema 
    CategorySchema
);

export default CagoryModel;