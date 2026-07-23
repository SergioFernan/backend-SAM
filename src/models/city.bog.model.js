import { Schema } from "mongoose";

const BogSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    stock: {
        type: Number,
        default: 1
    },
    status: {
        type: Number,
        default: true
    }
},
{
    versionKey: false,
    timestamps: true
})

const BogModel = model('city', BogSchema)

export default BogModel