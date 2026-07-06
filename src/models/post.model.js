import { Schema, model } from "mongoose";

// definir el esquema de publicaciones (posts)
const PostSchema = new Schema(
    {
        // titulo de la publicacion
        title: {
            type: String,
            required: [true, "El titulo es obligatorio"],
            trim: true, // elimina espacios al inicio y al final
        },

        // contenido o cuerpo del post
        content: {
            type: String,
            required: [true, "El contenido es obligatorio"],
            trim: true,
        },

        // imagen opcional del post (url de la imagen)
        imageUrl: {
            type: String,
            default: "", // vacio si no se sube imagen
            trim: true,
        },

        // tipo de publicacion para saber de que trata
        type: {
            type: String,
            default: "general",
            enum: ["general", "evento", "banda", "noticia"], // categorias de publicacion
        },

        // referencia al usuario que creo el post
        author: {
            type: Schema.Types.ObjectId, // id de mongo apuntando a otro documento
            ref: "users", // hace referencia a la coleccion users
            required: [true, "El autor es obligatorio"],
        },

        // referencia opcional a un evento relacionado con el post
        event: {
            type: Schema.Types.ObjectId,
            ref: "Events", // hace referencia a la coleccion de eventos
            default: null, // null si el post no esta relacionado a un evento
        },

        // para saber si el post esta activo o fue borrado
        isActive: {
            type: Boolean,
            default: true, // activo por defecto al crear
        },
    },
    {
        versionKey: false, // no mostrar el campo __v en las respuestas
        timestamps: true, // crea los campos createdAt y updatedAt automaticamente
    }
);

// definir el modelo
// 'posts' es el nombre de la coleccion en la base de datos
// PostSchema es la estructura que se va a usar para crear los documentos
const PostModel = model("posts", PostSchema);

export { PostModel };
