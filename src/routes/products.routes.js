const express = require(`express`);

const app = express.Router();


app.get(`/`, (req, res) => {
    res.json({
        msj: `hola`
    })
})

app.post(`/`, (req, res) => {
    res.json({
        msj: `hola`
    })
})

module.exports = app;