//En este archivo validamos los datos de las ordenes para que cumplan con el esquema definido en el archivo orders.js



import z from 'zod';

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

export const validateOrder = (order) => {
   
    return  orderSchema.safeParse(order);
   
  }

export const validatePartialOrder = (order) => {
    return orderSchema.partial().safeParse(order);
  }