import { Schema, model } from "mongoose";
//definir el esquema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true, //para que no haya espacios al principipo y al final
    },
    email: {
        type: String,
        required: true,
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
        enum: ["user", "admin"],
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true,
    }

}, {
    versionKey: false, // No mostrar el campo _id en las respuestas
    timestamps: true // Crea el campo createdAt y updatedAt automaticamente
});

// definir el modelo
// `users` define el nombre del objeto creado con este schema
// UserSchema es la estructura que se va a usar para crear el objeto
const UserModel = model(`users`, UserSchema);

export { UserModel };
