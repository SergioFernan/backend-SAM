import express from "express";
import eventsRoutes from "./routes/events.routes.js"
import locationsRoutes from "./routes/location.routes.js"

import { dbConection } from "./config/mongo.config.js";

const app = express();

dbConection();

app.use ( express.json ());

const port = 3000;

app.get(`/health`, (req, res) => {
    res.json({
        msj: "sitio corriendo"
    })
})

app.use('/events', eventsRoutes );
app.use('/locations', locationsRoutes );

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});