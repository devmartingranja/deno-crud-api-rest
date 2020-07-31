import { Response, Request, RouteParams } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

interface Materia {
  id: string;
  name: string;
  creditos: number;
  descripcion: string;
}

let materias: Materia[] = [{
  id: "45df4sd6fdsf",
  name: "español",
  creditos: 5,
  descripcion: 'materia para el entendimiento del lenguaje escrito del habla español'
}];

export const getMaterias = ({ response }: { response: Response }) => {
  response.body = {
    message: "listar todas",
    materias,
  };
};

// 1. forma a travez de RouteParams (es a la finral un objeto)
//export const getMateria = ({ response, params }: { response: Response, params:RouteParams }) => {
// 2. como es un objeto se lo crea    
export const getMateria = ({ response, params }: { response: Response, params: {id:string} }) => {

    try {
        const {id} = params
        const materia = materias.find( mat  => mat.id == id)
        if(!materia){
            throw new Error("no se encuentra un usuario con este id")
            return
        }
        response.status = 200
        response.body = {
            msg : "listado",
            data : materia
        }
    }
    catch(e) {
        response.status = 404;
        response.body = {
            msg : e .message        
        }
    }

};
export const createMateria = async ({ request, response }: { request: Request, response: Response }) => {
    
    try {

        const body = await request.body()
        console.log(body)

        //hasBody -> nos devuelve un boleano, validad si existe un body al enviar la inforamcion         
        if(!request.hasBody) {                    
            throw new Error("body es requerido")
        }

        const materia : Materia = body.value
        materia.id = v4.generate()
        materias.push(materia)

        response.status = 200;    
        response.body = {
            msg : "creado con exito",
            data : materia
        }

    }
    catch (e) {
        response.status = 404;
        response.body = {
            msg : e.message         
        }
    }
   
    
};
export const updateMateria = async ({request, response, params}: { request: Request, response: Response, params : {id:string}}) => {

    try {
        const body = await request.body()
        const {id} = params
        const maeria = materias.find(user => user.id === id)

        if(!maeria){
            throw new Error("usuario no encontrado")
        }
        if(!request.hasBody){
            throw new Error("body invalido")
        }
        
        const materiaBody: Materia = body.value
        materiaBody.id = id

        // 1. forma tipica de buscar y actualizar un objeto
        //users = users.map(user => user.id === userBody.id? user = userBody: user)       
        // 2. forma de convinar objetos en un campo es decir todo lo que tenia ese campo user mas lo nuevo que tenga (recordar que lo hace por cada campo)
        materias = materias.map(mat => mat.id === materiaBody.id? {...mat, ...materiaBody}: mat)       

        response.status = 200
        response.body = {
            msg : "Actualizado con exito",
            data : materiaBody
        }
        
    } catch (e) {
        response.status = 404
        response.body = {
            msg : e.message
        }
    }
};
export const deleteMateria = ({response, params}:{response:Response, params : {id:string}}) => {

    try {
        const {id} = params
        materias = materias.filter(mat => mat.id !== id)
        response.status = 200
        response.body = {
            msg : "usuario eliminado con exito",
            materias
        }
    }
    catch (e){
        response.status = 404,
        response.body = {
            msg : e.message
        }
    }
};
