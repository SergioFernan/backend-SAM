// function que se llama a user.routes.js para ejecutarse
function getUsers(req, res) {
    res.json({
        msj: `Listar usuarios`
    });
}

function postUsers(req, res) {
    res.json({
        msj: `crea usuario`
    })
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

module.exports = { getUsers, postUsers, putUsers, deleteUser };