import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJwt } from '../middlewares/validar-jwt';
import { DeleteTarea, GetTareas, PostTarea, PutTarea } from '../controllers/tareas';

const router = Router();

router.get('/:usuario_ref',[
    validarJwt,
    check('usuario_ref','El usuario_ref es obligatorio').not().isEmpty(),
    validarCampos
], GetTareas)

router.put('/:id', [
    validarJwt,
    check('id','El titulo es obligatorio').not().isEmpty(),
    check('titulo','El titulo es obligatorio').not().isEmpty(),
    validarCampos
], PutTarea)

router.post('/',[
    validarJwt,
    check('titulo','El titulo es obligatorio').not().isEmpty(),
    check('usuario_ref','El usuario_ref es obligatorio').not().isEmpty(),
    validarCampos
], PostTarea)

router.delete('/:id',[
    validarJwt,
    validarCampos
], DeleteTarea)


export default router;