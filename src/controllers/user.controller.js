// function que se llama a user.routes.js para ejecutarse
function getUsers(req, res) {
    res.json({
        msj: `Listar todos los usuarios`
    });
}


module.exports = { getUsers };