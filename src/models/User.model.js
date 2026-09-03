import { Schema, model } from "mongoose";
import { ROLES, ALLOWED_ROLES } from "../config/global.config.js"; // importamos los roles desde la config global
//definir el esquema
const UserSchema = new Schema({
    name: {
        type: String,
        default: ``,
        trim: true, //para que no haya espacios al principipo y al final
    },
    email: {
        type: String,
        required: [true, `El correo es obligatorio`], // el campo es obligatorio
        unique: true,// No permite correos duplicados en la base de datos
        lowercase: true, // pasa a minuscula
        trim: true,
        // match: [/.+\@.+\..+/, "Por favor, ingresa un correo válido"]
    },
    password: {
        type: String,
        required: [true, `La contrasena es obligatoria`],
        minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
    role: {
        type: String,
        enum: ALLOWED_ROLES, // usa la lista de roles definida en global.config.js
        default: ROLES.USER // por defecto el rol es user
    },
    avatar: {
        type: String,
        default: ``
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    barId: {
        type: Schema.Types.ObjectId,
        ref: 'bars'
    }

}, {
    versionKey: false, // No mostrar el campo _id en las respuestas
    timestamps: true // Crea el campo createdAt y updatedAt automaticamente
});

// definir el modelo
// `users` define el nombre del objeto creado con este schema
// UserSchema es la estructura que se va a usar para crear el objeto
const UserModel = model('users', UserSchema);

export { UserModel };
