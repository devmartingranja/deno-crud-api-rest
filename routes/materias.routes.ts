import {Router} from 'https://deno.land/x/oak/mod.ts'
import * as ctrMateria from '../controllers/materia.controllers.ts'
const router:Router = new Router();

router.get('/materias', ctrMateria.getMaterias)
router.get('/materia/:id', ctrMateria.getMateria)
router.post('/materia', ctrMateria.createMateria)
router.put('/materia/:id', ctrMateria.updateMateria)
router.delete('/materia/:id', ctrMateria.deleteMateria)

export default router;