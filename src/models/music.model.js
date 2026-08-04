import { Schema, model } from "mongoose";

const MusicSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "El nombre de la música/género es obligatorio"],
            trim: true,
        },
        genre: {
            type: String,
            trim: true,
        },
        description: {
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

const MusicModel = model("music", MusicSchema);

export { MusicModel };
