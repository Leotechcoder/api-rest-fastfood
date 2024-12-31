
import { access } from "../middleware/middleware.js";
import { Users } from "../models/users.js"; //importo la clase Users del archivo users.js


export class UsersController {

    //metodo para obtener todos los usuarios
    static async getUsers (req, res) {
        
        access(req, res); // middleware para permitir el acceso a la api
        const users = await Users.getUsers(); //obtengo los usuarios
        res.json(users);
    }

    //metodo para obtener un usuario por su id
    static async getUserById (req, res) {
        
        access(req, res); // middleware para permitir el acceso a la api
        const userId = parseInt(req.params.id);
        
        const user = await Users.getUserById({userId, res}); //obtengo el usuario por id
        
        res.json(user);  
     
    
        
    }

    //metodo para crear un nuevo usuario
    static async createUser (req, res) {
        
        access(req, res); // middleware para permitir el acceso a la api
        const { 
          name, 
          email 
        } = req.body;


        
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }
        
        console.log(req.headers);
      
        const NewUser = await Users.createUser(req.body); //creo un nuevo usuario
        res.status(201).json(NewUser);
        console.log('Nuevo usuario creado correctamente!');
        
    }

    //metodo para actualizar un usuario por su id
    static async updateUser (req, res) {

        access(req, res); // middleware para permitir el acceso a la api
        const userId = parseInt(req.params.id);
        
        const updatedUser =  await Users.updateUser({userId, req}); //actualizo el usuario con el id
    
        res.json(updatedUser);
        console.log('Datos de usuario actualizados correctamente!');
        
    }

    //metodo para eliminar un usuario por su id
    static async deleteUser (req, res) {
        
        access(req, res); // middleware para permitir el acceso a la api
        const userId = parseInt(req.params.id);

        Users.deleteUser({userId, res}); //Elimino el usuario con el id
        
    }
}