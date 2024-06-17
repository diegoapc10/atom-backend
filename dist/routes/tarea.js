"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const tareas_1 = require("../controllers/tareas");
const router = (0, express_1.Router)();
router.get('/:usuario_ref', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('usuario_ref', 'El usuario_ref es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], tareas_1.GetTareas);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('id', 'El titulo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('titulo', 'El titulo es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], tareas_1.PutTarea);
router.post('/', [
    validar_jwt_1.validarJWT,
    (0, express_validator_1.check)('titulo', 'El titulo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('usuario_ref', 'El usuario_ref es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], tareas_1.PostTarea);
router.delete('/:id', [
    validar_jwt_1.validarJWT,
    validar_campos_1.validarCampos
], tareas_1.DeleteTarea);
exports.default = router;
//# sourceMappingURL=tarea.js.map