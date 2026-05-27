import { UserModel } from "../models/User.model.js";
import { dbGetUsers, dbCreateUser, dbDeleteUser, dbUpdateUser } from "../services/user.service.js";

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
        const data = await dbCreateUser(inputData) // llama a la funcion insertUser de product.service.js para crear usuario
        res.status(201).json({
            msj: `usuario creado`,
            data: data
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msj: `error al crear usuario`
        })
    }
}

async function updateUsers(req, res) {
    const id = req.params.id; // encuentra el id por params para actualizar el usuario
    const inputData = req.body; // obtiene el objeto con los datos a actualizar por body
    const data = await dbUpdateUser(id, inputData);
    res.json({
        msj: `actualizar usuario`,
        data: data
    })
     // busca el id en la base de datos y actualiza con el objeto recibido por body, new:true devuelve el objeto actualizado
}

async function deleteUser(req, res) {
    try {
        const id = req.params.id; // recibe el id por params
        const data = await dbDeleteUser(id); // busca el id en la base de datos y lo borra
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

export { getUsers, postUsers, updateUsers, deleteUser };
