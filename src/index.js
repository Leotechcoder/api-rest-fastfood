//Aca voy a crear el backend de mi servidor importando express y creando una instancia de express

import express, { json } from 'express';

//Importo los arrays de productos, usuarios y orders
import {products} from './data/products.js';
import {users} from './data/users.js';
import {orders} from './data/orders.js';
import { validateOrder, validatePartialOrder } from './schemas/orders/orderSchema.js';

//Trasformo los array a JSON


const app = express();
app.use(express.json()); //middleware para poder leer el body de las peticiones

import { randomUUID } from 'node:crypto';



app.disable( 'x-powered-by' ); // Ocultar la cabecera de express

const port = process.env.PORT ?? 3000; //Defino el puerto en el que va a correr mi servidor

//Ruta para obtener todos los pedidos

app.get('/orders', (req, res) => {
  res.json(orders);
});

//Ruta para cargar una orden

app.post('/orders', (req, res) => {

  // Valido si los datos la orden que enviaron son correctos
  const result = validateOrder(req.body);
  console.log(result);
  
  // Si hay un error en los datos de la orden, devuelvo un error
  if (result.error) {

    console.log(result.error.message);
    
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }
  
  // Si los datos de la orden son correctos, creo una nueva orden y la agrego al array de orders
  
  const newOrder = {
    orderId: randomUUID(),
    ...result.data,
  };

  orders.push(newOrder);

  res.status(201).json(newOrder);
});

//Ruta para actualizar un dato de una orden 
app.patch('/orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const result = validatePartialOrder(req.body);

  if (result.error) {
    console.log(result.error.message);
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }
  
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

  res.json(updatedOrder);
} );


//Ruta para obtener todos los productos

app.get('/products', (req, res) => { 
  res.json(products); 
  console.log(req.headers);
    
});
//Ruta para obtener todos los usuarios
app.get('/users', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.json(users);
});

//Ruta para obtener un usuario por su id

app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

//Ruta para agregar un nuevo usuario
app.post('/users', (req, res) => {
  const { 
    name, 
    email 
  } = req.body;
  console.log(req.headers);
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const NewUser = { 
    id: randomUUID(), 
    name,
    email
  };

  users.push(NewUser);
  res.status(201).json(NewUser);
});

//Ruta para actualizar un usuario

app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users[userIndex] = updatedUser;
  res.json(updatedUser);
});

//Ruta para eliminar un usuario

app.delete('/users/:id', (req, res) => {
  req.header('Access-Control-Allow-Origin', '*');
  const userId = parseInt(req.params.id);

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(userIndex, 1);
  res.status(204).json({});
});

app.options('/users/:id',(req, res) =>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
})

//Arrancar el server

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${port}`);
});