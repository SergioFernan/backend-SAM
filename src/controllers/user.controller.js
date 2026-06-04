import { encryptPassword } from "../helpers/bcrypt.helper.js";
import { UserModel } from "../models/User.model.js";
import { dbGetUsers, dbCreateUser, dbDeleteUser, dbUpdateUser, dbGetUserById } from "../services/user.service.js";
import mongoose from "mongoose";
// function que se llama a user.routes.js para ejecutarse
async function getUsers(req, res) {
    try {
        const data = await dbGetUsers();
        res.status(200).json({
            msj: `obtener usuarios`,
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msj: `error al obtener usuarios`
        });
    }
}

async function postUsers(req, res) {

    try {
        const inputData = req.body; // recibe el body
        inputData.password = encryptPassword(inputData.password); // encripta la contraseña recibida por body
        if(inputData.password === null) { // si la contraseña no se pudo encriptar devuelve un error 500
            throw new Error(`error al encriptar contraseña`)    
            }
        inputData.password = password;
        const data = await dbCreateUser(inputData) // llama a la funcion insertUser de product.service.js para crear usuario
        res.status(201).json({
            msj: `usuario creado`,
            data: data
        });

    } catch (error) {
        console.error(error);
        if (error.code === 11000) { // error de clave duplicada
            return res.status(400).json({
                msj: `error de valicacion por duplicidad de correo`

            })
        }
        res.status(500).json({
            msj: `error al crear usuario`
        })
    }
}

async function getUserById(req, res) {
    try {
        const id = req.params.id; // recibe el id por params
        if(! mongoose.Types.ObjectId.isValid(id)) { // valida que el id sea un ObjectId válido
            return res.status(400).json({
                msj: `id no válido`
            })
        }
        const data = await dbGetUserById(id);
        if(!data) {  // si no encuentra el id en la base de datos devuelve un error 404
            return res.status(404).json({
                msj: `no se encuentra registro de ese usuario`
            })
        }
        res.json({
            msj: `obtener usuario por id`,
            data: data
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msj: `error al obtener usuario por id`
        })
    }
    // busca el id en la base de datos y devuelve el objeto    
}

async function updateUsers(req, res) {
    try {
        const id = req.params.id; // encuentra el id por params para actualizar el usuario
        const inputData = req.body; // obtiene el objeto con los datos a actualizar por body
        const data = await dbUpdateUser(id, inputData);
        res.json({
            msj: `actualizar usuario`,
            data: data
        })
    } catch (error) {
        console.error(error);
        if (error.name === 'CastError') {
            return res.status(400).json({
                msj: `id no válido`
            })
        }
        if (error.message.includes('no se encuentra registro de ese usuario para actualizar')) {
            return res.status(404).json({
                msj: error.message
            })
        }
        res.status(500).json({
            msj: `error al actualizar usuario`
        })
    }
    // busca el id en la base de datos y actualiza con el objeto recibido por body, new:true devuelve el objeto actualizado
}

async function deleteUser(req, res) {
    try {
        const id = req.params.id; // recibe el id por params
        if(! mongoose.Types.ObjectId.isValid(id)) { // valida que el id sea un ObjectId válido
            return res.status(400).json({
                msj: `id no válido`
            })
        }
        const data = await dbDeleteUser(id); // busca el id en la base de datos y lo borra
        if(!data) {
            return res.status(404).json({
                msj: `no se encuentra registro de ese usuario para borrar`
            })
        }
        res.json({
            msj: `borrar usuario`,
            data: data
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msj: `error al borrar usuario`
        })
    }
}

export { getUsers, postUsers, updateUsers, deleteUser, getUserById };
