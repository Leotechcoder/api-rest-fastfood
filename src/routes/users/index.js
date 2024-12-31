
//En este archivo se encuentran las rutas para 
// obtener, crear, actualizar y eliminar usuarios

import { Router } from "express";

import { UsersController } from "../../controllers/users.js";


//Creo la instancia de router para las rutas de los usuarios
export const routerUsers = Router();

//Ruta para obtener todos los usuarios
routerUsers.get('/', UsersController.getUsers);


//Ruta para obtener un usuario por su id
routerUsers.get('/:id', UsersController.getUserById);


//Ruta para crear un nuevo usuario
routerUsers.post('/', UsersController.createUser);


//Ruta para actualizar un usuario
routerUsers.put('/:id', UsersController.updateUser);

//Ruta para eliminar un usuario
routerUsers.delete('/:id', UsersController.deleteUser);


