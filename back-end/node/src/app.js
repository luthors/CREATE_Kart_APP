/*Tiene todas las configuraciones de express y llama a las rutas */
import express from 'express'
import usersRoutes from './routes/users.routes.js';
import indexRoutes from "./routes/index.routes.js"
import productsRoutes from "./routes/products.routes.js";
import cors from "cors";

const app = express()

app.use(cors())/*Api consumible, comunicar al front */

app.use(express.json())/*Primero se recibe los datos se convierten a json o un objeto js y luego se pasa a las rutas */


/*Rutas */
app.use(indexRoutes)
app.use('/api',usersRoutes)
app.use('/api', productsRoutes)

/*Not found Route */
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    })
}) 

export default app;