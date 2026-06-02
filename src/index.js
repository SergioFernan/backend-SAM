import express from "express";

import eventsRoutes from "./routes/events.routes.js"
import locationsRoutes from "./routes/location.routes.js"


import { dbConection } from "./config/mongo.config.js";

import userRoutes from "./routes/user.routes.js"
import categoryRoutes from './routes/categories.routes.js'
import ticketRoutes from './routes/ticket.routes.js';


const app = express();


dbConection();            //llamamos a la funcion para conectar con la base de datos


app.use(express.json());  //Habilitamos la interceptación de objetos JSon

const port = 3000;

app.get(`/health`, (req, res) => {
    res.json({
        msj: "sitio corriendo"
    })
})


//endpoint para probar rutas
app.use('/categories', categoryRoutes);
app.use('/tickets', ticketRoutes);


app.use('/events', eventsRoutes );
app.use('/locations', locationsRoutes );
app.use('/users', userRoutes );

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});