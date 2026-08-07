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
    localidad: {
        type: String
    },
    stock: {
        type: Number,
        default: 1,
        min: 1
    },
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
        type: String,   
        required: true
    },
    city: {
        type: String,
        required: true
    },
    geners: {
        type: Schema.Types.ObjectId,
        ref: 'geners',
        required: true
    }
}, {
    versionKey: false,  
    timestamps: true
});


const EventModel = model (`Events`, EventSchema );


export default EventModel;