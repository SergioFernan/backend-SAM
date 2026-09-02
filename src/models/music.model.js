import { Schema, model } from "mongoose";
const MusicSchema = new Schema(
    {
        name: {
            type: String,
            default: "Track de YouTube",
            trim: true
        },
        artist: {
            type: String,
            trim: true
        },
        imageUrl: {
            type: String,
            default: "/assets/default-event.jpg"
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
            required: [true, "La URL de youtube es obligatoria"],
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
