import { Schema, model } from "mongoose";

const SupportSchema = new Schema(
    {
        userEmail: {
            type: String,
            required: [true, "El correo electrónico del usuario es obligatorio"],
            trim: true,
            lowercase: true,
        },
        subject: {
            type: String,
            required: [true, "El asunto del ticket de soporte es obligatorio"],
            trim: true,
        },
        message: {
            type: String,
            required: [true, "El mensaje es obligatorio"],
            trim: true,
        },
        status: {
            type: String,
            enum: ["Open", "In Progress", "Resolved", "Closed"],
            default: "Open",
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const SupportModel = model("support_tickets", SupportSchema);

export { SupportModel };
