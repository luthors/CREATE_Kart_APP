/*Tiene todas las configuraciones de express y llama a las rutas */
import express from 'express'
import usersRoutes from './routes/users.routes.js';
import indexRoutes from "./routes/index.routes.js"
import productsRoutes from "./routes/products.routes.js";
import cors from "cors";
import { featuredProducts } from './controllers/featured.controller.js';

const app = express()


var corsOptions = {
    origin: 'http://127.0.0.1:4200',
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors())/*Api consumible, comunicar al front */

app.use(express.json(corsOptions))/*Primero se recibe los datos se convierten a json o un objeto js y luego se pasa a las rutas */


/*Rutas */
app.use(indexRoutes)
app.use('/api',usersRoutes)
app.use('/api', productsRoutes)
app.use('/api', featuredProducts)

/*Not found Route */
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    })
}) 

export default app;