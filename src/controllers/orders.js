
import { Orders } from '../models/orders.js';
import { access } from "../middleware/middleware.js";
import { validateOrder, validatePartialOrder } from '../../schemas/orders/orderSchema.js';

export class OrdersController {

    //metodo para obtener todas las ordenes
    static async getOrders (req, res) {

        access(req, res); // middleware para permitir el acceso a la api
        
        // Obtengo todas las ordenes
        const orders = await Orders.getOrders();
        //Devuelvo todas las ordenes
        res.json(orders);
        console.log('todas las ordenes' + orders);
    }

    //metodo para obtener una orden por id
    static async getOrderById (req, res) {

        access(req, res); // middleware para permitir el acceso a la api

        const orderId = parseInt(req.params.id);

        // Obtengo la orden por id
        const order = await Orders.getOrderById(orderId);
        //Devuelvo la orden
        res.json(order);
        console.log('orden con id'+ orderId + 'es'+ order);
    }

    //metodo para crear una orden
    static async createOrder (req, res) {

      access(req, res); // middleware para permitir el acceso a la api
        
      // Valido si los datos la orden que enviaron son correctos
            const result = validateOrder(req.body);
            console.log(result);
            
            // Si hay un error en los datos de la orden, devuelvo un error
            if (result.error) {
          
              console.log(result.error.message);
              
              return res.status(400);
            }
      // Si los datos de la orden son correctos, creo una nueva orden
      
            const newOrder = Orders.createOrder(result);
            //Devuelvo la nueva orden
            res.status(201).json(newOrder);
    }

    //metodo para actualizar parcialmente una orden
    static async updatePartialOrder (req, res)  {

        access(req, res); // middleware para permitir el acceso a la api
        
        // Valido si los datos la orden que enviaron son correctos
        const orderId = parseInt(req.params.id);
          const result = validatePartialOrder(req.body);
        
          if (result.error) {
            console.log(result.error.message);
            return res.status(400).json({ error: JSON.parse(result.error.message) });
          }

        // Actualizo la orden  
        const updatedOrder = Orders.updatePartialOrder(orderId, result.data);
        //Devuelvo la orden actualizada
        res.json(updatedOrder);
    }

    //metodo para eliminar una orden
    static async deleteOrder (req, res) {

        access(req, res); // middleware para permitir el acceso a la api
        const orderId = parseInt(req.params.id);
        
        // Elimino la orden
        const order = Orders.deleteOrder(orderId);
        
        // Si la orden se elimino correctamente, devuelvo un mensaje 204
        res.status(204).send();
    }
 
}