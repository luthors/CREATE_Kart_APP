import express from "express"

const app = express()

//Endpoint para consultar desde aplicaciones clientes
app.get('/employess' , (req, res) => res.send ('obteniendo empleados'))//Leer empleados
app.post('/employess' , (req, res) => res.send ('creando empleados'))//Crear empleados
app.put('/employess' , (req, res) => res.send ('actualizando empleados'))//Actualizar empleados
app.delete('/employess' , (req, res) => res.send ('eliminando empleados'))//Eliminar empleados

app.listen(4200)
console.log('Corriendo el servidor 4200')