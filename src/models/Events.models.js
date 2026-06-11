import { Schema , model } from "mongoose";

const EventSchema = new Schema({
    name: {
        type: String,
        required: true ,
        trim: true
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
    } ,

    status : {
        type: Boolean,
        default: true
    },

    initialDate: { 
        type: Date,
        required: true
    },

    finalDate: {
        type: Date,
        required: true
    },

    imageUrl: {
        type: String
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId, // El tipo de dato es un ObjectId, que es el tipo de dato que se utiliza para referenciar a otro documento en MongoDB
        ref: 'users', // El nombre del modelo al que se hace referencia, en este caso es el modelo de usuarios, esto permite hacer una relación entre el evento y el usuario que lo creó
        required: true // Este campo es obligatorio, no se puede crear un evento sin un usuario que lo haya creado
    }

}, {
    versionKey: false,  
    timestamps: true
});


const EventModel = model (`Events`, EventSchema );


export default EventModel;