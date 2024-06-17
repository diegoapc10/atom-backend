"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuarios_1 = require("../controllers/usuarios");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = (0, express_1.Router)();
router.get('/', usuarios_1.getUsuarios);
router.get('/:id', [
    (0, express_validator_1.check)('id', 'El id es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], usuarios_1.getUsuarioById);
router.get('/byEmail/:email', [
    (0, express_validator_1.check)('email', 'El email es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], usuarios_1.getUsuarioByEmail);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('password', 'El password debe ser más de 6 letras').isLength({ min: 6 }),
    (0, express_validator_1.check)('correo', 'El correo no es válido').isEmail(),
    validar_campos_1.validarCampos
], usuarios_1.postUsuario);
exports.default = router;
//# sourceMappingURL=usuario.js.map