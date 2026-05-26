import { Schema, model } from "mongoose";

// 1ra parte: Definir el esquema

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true         //Quita los espacios al principio y al final para evitar espacios inecesarios 
    },
    description: String,
    status: {
        type: Boolean,
        default: true
    },
    // createDate: {
    // type: Date,
    // default: Date.now
    // }

},{
    versionKey: false,
    timestamps: true  
});

// 2da parte: Definir el modelo 

const CagoryModel = model(
    'category',                // Define el nombre de la collección que almacenará el objeto creado con este schema 
    CategorySchema
);

export default CagoryModel;