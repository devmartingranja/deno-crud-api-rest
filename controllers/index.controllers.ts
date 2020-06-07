import { Response, Request, RouteParams } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

interface User {
  id: string;
  name: string;
}

let users: User[] = [{
  id: "0",
  name: "jose",
}];

export const getUsers = ({ response }: { response: Response }) => {
  response.body = {
    message: "listar todos",
    users,
  };
};

// 1. forma a travez de RouteParams (es a la finral un objeto)
//export const getUser = ({ response, params }: { response: Response, params:RouteParams }) => {
// 2. como es un objeto se lo crea    
export const getUser = ({ response, params }: { response: Response, params: {id:string} }) => {

    try {
        const {id} = params
        const user = users.find( user => user.id == id)
        if(!user){
            throw new Error("no se encuentra un usuario con este id")
            return
        }
        response.status = 200
        response.body = {
            msg : "listado",
            data : user
        }
    }
    catch(e) {
        response.status = 404;
        response.body = {
            msg : e .message        
        }
    }

};
export const createUser = async ({ request, response }: { request: Request, response: Response }) => {
    
    try {

        const body = await request.body()

        //hasBody -> nos devuelve un boleano, validad si existe un body al enviar la inforamcion         
        if(!request.hasBody) {                    
            throw new Error("body es requerido")
        }

        const user : User = body.value
        user.id = v4.generate()
        users.push(user)

        response.status = 200;    
        response.body = {
            msg : "creado con exito",
            data : user
        }

    }
    catch (e) {
        response.status = 404;
        response.body = {
            msg : e.message         
        }
    }
   
    
};
export const updateUser = async ({request, response, params}: { request: Request, response: Response, params : {id:string}}) => {

    try {
        const body = await request.body()
        const {id} = params
        const user = users.find(user => user.id === id)

        if(!user){
            throw new Error("usuario no encontrado")
        }
        if(!request.hasBody){
            throw new Error("body invalido")
        }
        
        const userBody: User = body.value
        userBody.id = id

        // 1. forma tipica de buscar y actualizar un objeto
        //users = users.map(user => user.id === userBody.id? user = userBody: user)       
        // 2. forma de convinar objetos en un campo es decir todo lo que tenia ese campo user mas lo nuevo que tenga (recordar que lo hace por cada campo)
        users = users.map(user => user.id === userBody.id? {...user, ...userBody}: user)       

        response.status = 200
        response.body = {
            msg : "Actualizado con exito",
            data : userBody
        }
        
    } catch (e) {
        response.status = 404
        response.body = {
            msg : e.message
        }
    }
};
export const deleteUser = ({response, params}:{response:Response, params : {id:string}}) => {

    try {
        const {id} = params
        users = users.filter(user => user.id !== id)
        response.status = 200
        response.body = {
            msg : "usuario eliminado con exito",
            users
        }
    }
    catch (e){
        response.status = 404,
        response.body = {
            msg : e.message
        }
    }
};
