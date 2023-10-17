import express from 'express'
import customersRoutes from './routes/customers.routes.js';
import indexRoutes from "./routes/index.routes.js"

const app = express()

app.use(express.json())/*Primero se recibe los datos se convierten a json o un objeto js y luego se pasa a las rutas */

/*Rutas */
app.use(indexRoutes)
app.use('/api',customersRoutes)

app.listen(4200, ()=>{
    console.log('SERVER  Corriendo el servidor http://localhost:4200/') })