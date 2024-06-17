import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';
import { DeleteTarea, GetTareas, PostTarea, PutTarea } from '../controllers/tareas';

const router = Router();

router.get('/:usuario_ref',[
    validarJWT,
    check('usuario_ref','El usuario_ref es obligatorio').not().isEmpty(),
    validarCampos
], GetTareas)

router.put('/:id', [
    validarJWT,
    check('id','El titulo es obligatorio').not().isEmpty(),
    check('titulo','El titulo es obligatorio').not().isEmpty(),
    validarCampos
], PutTarea)

router.post('/',[
    validarJWT,
    check('titulo','El titulo es obligatorio').not().isEmpty(),
    check('usuario_ref','El usuario_ref es obligatorio').not().isEmpty(),
    validarCampos
], PostTarea)

router.delete('/:id',[
    validarJWT,
    validarCampos
], DeleteTarea)


export default router;