import { Schema, model } from "mongoose";

// definir el esquema de pasarela de pagos
const GatewaySchema = new Schema(
    {
        // nombre de la pasarela (ej: "Stripe", "PayPal")
        name: {
            type: String,
            required: [true, "El nombre de la pasarela es obligatorio"],
            trim: true, // elimina espacios al inicio y al final
            unique: true, // no permite nombres duplicados en la base de datos
        },

        // proveedor del servicio de pago
        provider: {
            type: String,
            required: [true, "El proveedor es obligatorio"],
            trim: true,
            lowercase: true, // guarda siempre en minuscula
            enum: ["stripe", "paypal", "mercadopago", "wompi", "epayco", "other"], // solo estos valores son permitidos
        },

        // id de la transaccion que devuelve el proveedor externo
        transactionId: {
            type: String,
            default: "", // vacio por defecto hasta que se procese el pago
            trim: true,
        },

        // monto cobrado en la transaccion
        amount: {
            type: Number,
            required: [true, "El monto es obligatorio"],
            min: [0, "El monto no puede ser negativo"], // no permite valores negativos
        },

        // moneda usada en la transaccion (formato ISO 4217, ej: "COP", "USD")
        currency: {
            type: String,
            default: "COP", // por defecto peso colombiano
            uppercase: true, // guarda siempre en mayuscula
            trim: true,
        },

        // estado actual del pago
        status: {
            type: String,
            default: "pending", // por defecto queda pendiente cuando se crea
            enum: ["pending", "approved", "rejected", "cancelled", "refunded"], // solo estos estados son validos
        },

        // referencia al usuario que hizo el pago
        user: {
            type: Schema.Types.ObjectId, // id de mongo que apunta a otro documento
            ref: "users", // hace referencia a la coleccion users
            required: [true, "El usuario es obligatorio"],
        },

        // referencia al ticket que se esta pagando
        ticket: {
            type: Schema.Types.ObjectId, // id de mongo que apunta a otro documento
            ref: "ticket", // hace referencia a la coleccion ticket
            required: [true, "El ticket es obligatorio"],
        },

        // informacion extra que puede devolver el proveedor (ej: url del recibo)
        metadata: {
            type: Object, // objeto flexible para guardar cualquier dato adicional
            default: {}, // por defecto vacio
        },

        // para saber si la pasarela esta activa o no
        isActive: {
            type: Boolean,
            default: true, // activa por defecto al crear
        },
    },
    {
        versionKey: false, // no mostrar el campo __v en las respuestas
        timestamps: true, // crea los campos createdAt y updatedAt automaticamente
    }
);

// definir el modelo
// 'gateways' es el nombre de la coleccion en la base de datos
// GatewaySchema es la estructura que se va a usar para crear los documentos
const GatewayModel = model("gateways", GatewaySchema);

export { GatewayModel };
