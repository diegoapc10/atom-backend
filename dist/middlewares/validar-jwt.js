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
exports.validarJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const conexion_1 = __importDefault(require("../db/conexion"));
const validarJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.header('authorization');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    try {
        token = token.replace('Bearer ', '');
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRETORPRIVATEKEY);
        const collectionUsuarios = conexion_1.default.collection('usuarios');
        const docUsuario = yield collectionUsuarios.doc(payload.id).get();
        if (!docUsuario) {
            return res.status(401).json({
                msg: 'token no valido - usuario no existe en bd'
            });
        }
        let usuario = docUsuario.data();
        usuario.id = docUsuario.id;
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Intento realizar una petición con un usuario eliminado'
            });
        }
        req.usuario = usuario;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'token no valido'
        });
    }
});
exports.validarJwt = validarJwt;
//# sourceMappingURL=validar-jwt.js.map