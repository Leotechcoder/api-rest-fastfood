//En este archivo validamos los datos de las ordenes para que cumplan con el esquema definido en el archivo orders.js


//Aca importamos zod para validar los datos de las ordenes
import z from 'zod';

//Aca definimos el esquema que deben cumplir las ordenes para ser validadas
const orderSchema = z.object({
    userId: z.number().int(),
    items: z.array(z.object({
      productId: z.number().int(),
      quantity: z.number().int(),
    })),
    totalAmount: z.number(),
    status: z.string(),
    orderDate: z.string({
        message: 'orderDate is required',
        required_error: 'orderDate is required',
        format: {
            type: 'date',
            message: 'orderDate must be a valid date',
        },
    }),
  });

//Aca exportamos las funciones para validar las ordenes
export const validateOrder = (order) => {
   
    return  orderSchema.safeParse(order);
   
  }


//Aca exportamos las funciones para validar datos parciales (e.g: status y orderDate)
export const validatePartialOrder = (order) => {
    return orderSchema.partial().safeParse(order);
  }