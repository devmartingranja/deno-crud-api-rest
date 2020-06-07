import {Application, Router} from 'https://deno.land/x/oak/mod.ts'
import router from "./routes/index.routes.ts";

const app:Application = new Application();
// const router:Router = new Router();
const port = 3000;

// router.get('/', ctx  => {}) en realidad es un objeto context pero de hay se puede obtener los parametros a continuación
// router.get('/', ({request, response}) => {
//     response.body = 'hello word'
// })

app.use(router.routes());
app.use(router.allowedMethods())

console.log("server runnin on port", port)
await app.listen({port:port});