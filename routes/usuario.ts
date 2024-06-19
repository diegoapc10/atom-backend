import { Router } from 'express';
import { check } from 'express-validator';
import { getUsuarioByEmail, getUsuarioById, getUsuarios, postUsuario } from '../controllers/usuarios';
import { validarCampos } from '../middlewares/validar-campos';

const router = Router();

router.get('/', getUsuarios);

router.get('/:id', [
    check('id','El id es obligatorio').not().isEmpty(),
    validarCampos
], getUsuarioById);

router.get('/byEmail/:email', [
    check('email','El email es obligatorio').not().isEmpty(),
    validarCampos
], getUsuarioByEmail)

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser más de 6 letras').isLength({ min: 6 }),
    check('correo','El correo no es válido').isEmail(),
    validarCampos
], postUsuario);

export default router;