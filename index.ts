import {Application, Router} from 'https://deno.land/x/oak/mod.ts'
import routerUsuarios from "./routes/index.routes.ts";
import routerMaterias from "./routes/materias.routes.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const app:Application = new Application();
// const router:Router = new Router();
const port = 3001;

// router.get('/', ctx  => {}) en realidad es un objeto context pero de hay se puede obtener los parametros a continuación
// router.get('/', ({request, response}) => {
//     response.body = 'hello word'
// })
app.use(oakCors()); // Enable CORS for All Routes

app.use(routerUsuarios.routes());
app.use(routerUsuarios.allowedMethods())

app.use(routerMaterias.routes());
app.use(routerMaterias.allowedMethods())

console.log("server runnin on port", port)
await app.listen({port:port});