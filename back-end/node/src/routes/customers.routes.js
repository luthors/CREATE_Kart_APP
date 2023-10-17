/*Agrupar todas las rutas*/
import {Router} from "express";
import {getCustomers, createCustomers, updateCustomers, deleteCustomers, getCustomersId} from '../controllers/customers.controller.js';

const router = Router()

//Endpoints para consultar desde aplicaciones clientes, se visualizan todos los clientes
router.get('/customers' , getCustomers)//Leer clientes
router.post('/customers' ,createCustomers)//Crear clientes

//Obtener un cliente en específico
router.get('/customers/:id' , getCustomersId)//Leer clientes
router.patch('/customers/:id' , updateCustomers)//Actualizar clientes
router.delete('/customers/:id' , deleteCustomers)//Eliminar clientes



export default router