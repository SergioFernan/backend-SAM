import { insertUser } from "../services/product.service.js";

// function que se llama a user.routes.js para ejecutarse
function getUsers(req, res) {
    res.json({
        msj: `Listar usuarios`
    });
}

async function postUsers(req, res) {

    try {
        const inputData = req.body; // recibe el body
        const data = await insertUser(inputData) // llama a la funcion insertUser de product.service.js para crear usuario
        res.status(201).json({
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
