import express from "express";
import userRoutes from "./routes/user.routes.js"

const app = express();

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