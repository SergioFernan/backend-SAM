import { Schema, model } from "mongoose";

const MusicSchema = new Schema(
    {
        youtubeUrl: {
            type: String,
            required: [true, "La URL de YouTube es obligatoria"],
            trim: true,
            match: [/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/, "Por favor, ingresa una URL válida de YouTube"]
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const MusicModel = model("music", MusicSchema);

export { MusicModel };
