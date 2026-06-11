import { Schema, model } from "mongoose";

// 1ra parte: Definir el esquema

const CategorySchema = new Schema({
    
    name: {
        type: String,
        required: true,
        trim: true         //Quita los espacios al principio y al final para evitar espacios inecesarios 
    },
    description: String,
    location: {
        type: String,
        required: true, 
        trim: true
    },
    status: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: Schema.Types.ObjectId, // El tipo de dato es un ObjectId, que es el tipo de dato que se utiliza para referenciar a otro documento en MongoDB
        ref: 'users', // El nombre del modelo al que se hace referencia, en este caso es el modelo de usuarios, esto permite hacer una relación entre la categoría y el usuario que la creó
        required: true // Este campo es obligatorio, no se puede crear una categoría sin un usuario que la haya creado
    }
},{
    versionKey: false,
    timestamps: true  
});

// 2da parte: Definir el modelo 

const CategoryModel = model(
    'category',                // Define el nombre de la collección que almacenará el objeto creado con este schema 
    CategorySchema
);

export default CategoryModel;