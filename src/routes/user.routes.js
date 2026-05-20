const { Router } = require(`express`);
const { getUsers } = require("../controllers/user.controller.js");

const app = Router();

//definicion de las rutas de user
// rutea desde ../controllers/user.controller.js la funcion con el json
app.get(`/`, getUsers)

module.exports = app;