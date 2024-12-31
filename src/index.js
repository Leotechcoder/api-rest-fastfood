//Aca voy a crear el backend de mi servidor importando express y creando una instancia de express

import express, { json } from 'express';

//Importo las rutas de usuarios y orders
import { routerOrders } from './routes/orders/index.js';
import { routerUsers } from './routes/users/index.js';

const app = express();//Creo una instancia de express
app.use(express.json()); //middleware para poder leer el body de las peticiones

app.disable( 'x-powered-by' ); // Ocultar la cabecera de express


//Defino las rutas de mi servidor

//Rutas para crear obtener y modificar ordenes

app.use('/orders', routerOrders);

//Rutas para crear obtener y modificar informacion sobre usuarios

app.use('/users', routerUsers)


const port = process.env.PORT ?? 3000; //Defino el puerto en el que va a correr mi servidor

//Arrancar el server

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${port}`);
});