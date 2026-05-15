const express = require("express");

const app = express();

const port = 3000;

app.get(`/health`, (req, res) => {
    res.json({
        msj: "hola mundo"
    })
})

app.use('/user', require(`./routes/user.routes.js`))
app.use(`/products`, require(`./routes/products.routes.js`))

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});