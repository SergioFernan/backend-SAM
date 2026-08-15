import { Schema, model } from "mongoose";

const LocalidadSchema = new Schema({
    enabled: {
        type: Boolean,
        default: false
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    price: {
        type: Number,
        default: 0,
        min: 0
    }
}, { _id: false });

const EventSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    localidades: {
        general: LocalidadSchema,
        vip: LocalidadSchema,
        backstage: LocalidadSchema,
        palco: LocalidadSchema
    },
    initialDate: {
        type: Date,
        required: true
    },
    finalDate: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        default: 'General'
    },
    imageUrl: {
        type: String,
        required: true
    },
    bar: {
        type: Schema.Types.ObjectId,
        ref: 'bars'
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});

const EventModel = model('Events', EventSchema);

export default EventModel;