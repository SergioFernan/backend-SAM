import { Schema, model } from "mongoose";

const MusicSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "El nombre de la canción es obligatorio"],
            trim: true
        },
        artist: {
            type: String,
            trim: true
        },
        imageUrl: {
            type: String,
            required: [true, "La URL de la imagen es obligatoria"]
        },
        externalUrl: {
            type: String,
            trim: true
        },
        genre: {
            type: String,
            trim: true
        },
        youtubeUrl: {
            type: String,
            trim: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const MusicModel = model("music", MusicSchema);

export { MusicModel };
