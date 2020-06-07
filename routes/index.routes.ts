import {Router} from 'https://deno.land/x/oak/mod.ts'
import * as ctrUsuarios from '../controllers/index.controllers.ts'
const router:Router = new Router();

router.get('/', ({request, response}) => {
    response.body = 'hola mundo'
})

router.get('/users', ctrUsuarios.getUsers)
router.get('/user/:id', ctrUsuarios.getUser)
router.post('/user', ctrUsuarios.createUser)
router.put('/user/:id', ctrUsuarios.updateUser)
router.delete('/user/:id', ctrUsuarios.deleteUser)

export default router;