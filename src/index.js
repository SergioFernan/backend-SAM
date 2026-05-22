import express from "express";

import userRoutes from "./routes/user.routes.js"

import { dbConection } from "./config/mongo.config.js";

const app = express();

dbConection();//llamamos a la funcion para conectar con la base de datos

//middlewares
app.use(express.json());//para que express pueda entender el formato json en req.body

const port = 3000;

app.get(`/health`, (req, res) => {
    res.json({
        msj: "sitio corriendo"
    })
})
//endpoint para probar rutas
app.use('/user', userRoutes);


//lanzar el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});