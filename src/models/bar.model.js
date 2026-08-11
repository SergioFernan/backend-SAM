import { Schema, model } from "mongoose";

const BarSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "El nombre del bar o local es obligatorio"],
            trim: true,
        },
        description: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: [true, "La dirección es obligatoria"],
            trim: true,
        },
        capacity: {
            type: Number,
            default: 0,
        },
        contactPhone: {
            type: String,
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const BarModel = model("bars", BarSchema);

export { BarModel };
