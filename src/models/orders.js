
import { orders } from '../../data/orders.js';
import { randomUUID } from 'node:crypto';

export class Orders {

    //Obtener todas las ordenes
    static async getOrders() {

        return orders;
    }

    //Obtener una orden por su id
    static async getOrderById({ orderId, res }) {

        const order = orders.find((order) => order.orderId === orderId);
        
        if (!order) {
          return res.status(404).json({ message: 'Order not found' });
        }
        
        return order;
    }

    //Crear una orden
    static async createOrder(result) {
    
      const newOrder = {
        orderId: randomUUID(),
        ...result.data,
      };
    
      orders.push(newOrder);
      return newOrder;
    }

    //Actualizar parcialmente una orden
    static async updateOrder({ orderId, result }, res) {

        const orderIndex = orders.findIndex((order) => order.orderId === orderId);
        
          if (orderIndex === -1) {
            return res.status(404).json({ message: 'Order not found' });
          }
          
        const updatedOrder = 
          {
            ...orders[orderIndex],
            ...result.data 
          };
        
        orders[orderIndex] = updatedOrder;
        return updatedOrder;
    }

    //Eliminar una orden
    static async deleteOrder({ orderId }, res) {

        const orderIndex = orders.findIndex((order) => order.orderId === orderId);
        
        if (orderIndex === -1) {
          return res.status(404).json({ message: 'Order not found' });
        }
        
        orders.splice(orderIndex, 1);
    }
}