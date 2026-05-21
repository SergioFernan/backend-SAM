import { Schema , model } from `mongoose`;

// 1. Definir esquema
const EventSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    description: String,
    price: {
        type: Number,
        default: 0,
        min: 0, 
    }
    stock: {
        type: Number,
        default: 1,
        min: 1
    } 

    status : {
        type: Boolean,
        default: true
    }
}
}, {});


// 2. Definir el modelo
const EventModel = model (`Events`, EventSchema );


export default EventModel;