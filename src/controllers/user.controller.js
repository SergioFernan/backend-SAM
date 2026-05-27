import { UserModel } from "../models/User.model.js";
import { dbGetUsers, dbCreateUser } from "../services/user.service.js";

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

function putUsers(req, res) {
    res.json({
        msj: `actualzar usuario`
    })
}

function deleteUser(req, res) {
    res.json({
        msj: `borrar usuario`
    })
}

export { getUsers, postUsers, putUsers, deleteUser };
