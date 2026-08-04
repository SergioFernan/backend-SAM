import { Schema, model } from "mongoose";

const ArtistSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "El nombre del artista o banda es obligatorio"],
            trim: true,
        },
        genre: {
            type: String,
            trim: true,
        },
        bio: {
            type: String,
            trim: true,
        },
        socialLinks: {
            type: [String],
            default: [],
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

const ArtistModel = model("artists", ArtistSchema);

export { ArtistModel };
