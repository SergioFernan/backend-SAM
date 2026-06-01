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

    CreatedDate: { 
        type: Date,
        default: Date
    },

    date: {
        type: Date,
        required: true
    },

    imageUrl: {
        type: String
    },

    category: {
        type: String,
        enum: ["concierto", "Rave", "otro"],
        default: "otro"
    }


}, {
    versionKey: false,  
    timestamps: true
});


const EventModel = model (`Events`, EventSchema );


export default EventModel;