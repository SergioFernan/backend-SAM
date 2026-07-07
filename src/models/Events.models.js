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

    eventLocation: {
        type: String,
        required: true,
        trim: true // Quita espacios en blanco innecesarios al inicio y final
    },

    eventSecret: {
        type: Boolean,
        default: false // Por defecto asumimos que NO es secreta
    },

    eventInformation: {
        type: String,
        required: true,
        trim: true
    }

}, {
    versionKey: false,  
    timestamps: true
});


const EventModel = model (`Events`, EventSchema );


export default EventModel;