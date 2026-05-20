const { Router } = require(`express`);
const { getUsers, postUsers, putUsers, deleteUser } = require("../controllers/user.controller.js");

const app = Router();

//definicion de las rutas de user
// rutea desde ../controllers/user.controller.js la funcion con el json
app.get(`/`, getUsers)

app.post(`/`, postUsers)

app.put(`/`, putUsers)

app.delete(`/`, deleteUser)

module.exports = app;