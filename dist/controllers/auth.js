"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const conexion_1 = __importDefault(require("../db/conexion"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generarJWT_1 = require("../helpers/generarJWT");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let usuario;
        const { correo, password } = req.body;
        const collectionUsuarios = conexion_1.default.collection('usuarios');
        const documentos = yield collectionUsuarios.where('correo', '==', correo).get();
        documentos.forEach(doc => {
            const user = doc.data();
            user.id = doc.id;
            usuario = user;
        });
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario se encuentra bloqueado'
            });
        }
        const token = yield (0, generarJWT_1.generarJWT)(usuario.id);
        res.json({
            token
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error en el login'
        });
    }
});
exports.login = login;
//# sourceMappingURL=auth.js.map