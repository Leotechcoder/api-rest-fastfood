import { users } from '../data/users.js'; //base de datos local
import { randomUUID } from 'node:crypto';

export class Users {

    //Obtener todos los usuarios
    static async getUsers() {
        return  users;
    }


    //Obtener un usuario por su id
    static async getUserById({userId, res}) {
        const user = users.find((user) => user.id === userId);
  
    if (!user) {
      res.status(404).send('usuario no encontrado');
      console.log('El usuario no existe en nuestra base de datos');
      
    }else{
      console.log('El usuario existe en nuestra base de datos');
      return user;
      
    }
    
    }
    

    //Crear un nuevo usuario
    static async createUser({ name, email }) {
        const NewUser = { 
              id: randomUUID(), 
              name,
              email
            };
          
            users.push(NewUser);
            return NewUser;
    }


    //Actualizar un usuario
    static async updateUser({ userId, req }) {

        const userIndex = users.findIndex((user) => user.id === userId);
          
            if (userIndex === -1) {
              return res.status(404);
            }
          
            const id = userId;
            users[userIndex] = {id, ...req.body};

            return  {id, ...req.body};
    }


    //Borrar un usuario
    static async deleteUser({userId, res}) {

        const userIndex = users.findIndex((user) => user.id === userId);
        
        if (userIndex === -1) {
          
          const resStatus = res.status(404);
          
        }
        else{

          users.splice(userIndex, 1);
  
          res.status(204).end(); //Esta es la respuesta final!
          console.log(res.statusCode);
          
        }
      
}}