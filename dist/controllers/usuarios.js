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
exports.postUsuario = exports.getUsuarioByEmail = exports.getUsuarioById = exports.getUsuarios = void 0;
const conexion_1 = __importDefault(require("../db/conexion"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let usuarios = [];
        const collectionUsuarios = conexion_1.default.collection('usuarios');
        const documentos = yield collectionUsuarios.get();
        documentos.forEach(doc => {
            const usuario = doc.data();
            usuario.id = doc.id;
            usuarios.push(usuario);
        });
        res.json({
            status: true,
            usuarios
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            msg: 'Error al obtener usuarios'
        });
    }
});
exports.getUsuarios = getUsuarios;
const getUsuarioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const collectionUsuarios = conexion_1.default.collection('usuarios');
        const docUsuario = yield collectionUsuarios.doc(id).get();
        if (!docUsuario.exists) {
            return res.status(400).json({
                msg: 'El id ingresado no pertenece a ningún usuario'
            });
        }
        let usuario = docUsuario.data();
        usuario.id = docUsuario.id;
        res.json({
            status: true,
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            msg: 'Error al obtener usuario'
        });
    }
});
exports.getUsuarioById = getUsuarioById;
const getUsuarioByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const collectionUsuarios = conexion_1.default.collection('usuarios');
        const docBuscado = yield collectionUsuarios.where('correo', '==', email).limit(1).get();
        let usuario;
        docBuscado.forEach(doc => {
            const user = doc.data();
            user.id = doc.id;
            usuario = user;
        });
        res.json({
            status: true,
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            msg: 'Error al obtener el usuario'
        });
    }
});
exports.getUsuarioByEmail = getUsuarioByEmail;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parametros = req.body;
        const salt = yield bcryptjs_1.default.genSaltSync();
        parametros.password = yield bcryptjs_1.default.hashSync(parametros.password, salt);
        let usuario = {
            nombre: parametros.nombre,
            correo: parametros.correo,
            password: parametros.password,
            estado: true
        };
        const collectionUsuarios = conexion_1.default.collection('usuarios');
        const docBuscado = yield collectionUsuarios.where('correo', '==', usuario.correo).get();
        let validarUsuario;
        docBuscado.forEach(querySnapshot => {
            validarUsuario = querySnapshot.data();
        });
        if (validarUsuario) {
            return res.status(400).json({
                msg: 'Este correo ya fue registrado anteriormente, intente con otro correo'
            });
        }
        const resultCreate = yield collectionUsuarios.add(usuario);
        if (!resultCreate.id) {
            return res.status(400).json({
                msg: 'No se pudo registrar el usuario en la BD'
            });
        }
        res.json({
            status: true,
            id: resultCreate.id
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            msg: 'Error al crear usuario'
        });
    }
});
exports.postUsuario = postUsuario;
//# sourceMappingURL=usuarios.js.map