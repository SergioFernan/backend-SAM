const express = require(`express`);

const app = express.Router();

app.get(`/`, (req, res) => {
    res.json({
        msj: `hola mundo`
    })
})

module.exports = app;