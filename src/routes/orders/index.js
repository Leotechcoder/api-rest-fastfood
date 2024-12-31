//Archivo que contiene las rutas de la entidad orders
// para obtener, crear, actualizar y eliminar ordenes

import { Router } from 'express';
import { OrdersController } from '../../controllers/orders.js';

export const routerOrders = Router();

//obtener todas las ordenes
routerOrders.get('/', OrdersController.getOrders);

//Obtener una orden por id
routerOrders.get('/:id', OrdersController.getOrderById);

//Crear una orden
routerOrders.post('/', OrdersController.createOrder);

//Actualizar parcialmente una orden
routerOrders.patch('/:id', OrdersController.updatePartialOrder);

//Eliminar una orden
routerOrders.delete('/:id', OrdersController.deleteOrder);