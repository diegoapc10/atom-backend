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
exports.DeleteTarea = exports.PutTarea = exports.PostTarea = exports.GetTareas = void 0;
const conexion_1 = __importDefault(require("../db/conexion"));
const GetTareas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.params;
        let tareas = [];
        const collectionTareas = conexion_1.default.collection('tareas');
        const docTareas = yield collectionTareas.where('usuarioRef', '==', `usuarios/${params.usuario_ref}`);
        const ordenado = yield docTareas.orderBy('fecha', 'desc').get();
        ordenado.forEach(doc => {
            const task = doc.data();
            task.id = doc.id;
            tareas.push(task);
        });
        res.json({
            tareas
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener sus tareas'
        });
    }
});
exports.GetTareas = GetTareas;
const PostTarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.body;
        const tarea = {
            titulo: params.titulo,
            descripcion: params.descripcion,
            fecha: new Date(),
            usuarioRef: `usuarios/${params.usuario_ref}`
        };
        const collectionTareas = conexion_1.default.collection('tareas');
        const docTarea = yield collectionTareas.add(tarea);
        if (!docTarea.id) {
            return res.status(400).json({
                msg: 'Error al insertar la tarea'
            });
        }
        res.json({
            id: docTarea.id
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al insertar la tarea'
        });
    }
});
exports.PostTarea = PostTarea;
const PutTarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.params;
        const body = req.body;
        let tarea = {};
        if (body.titulo) {
            tarea.titulo = body.titulo;
        }
        if (body.descripcion) {
            tarea.descripcion = body.descripcion;
        }
        tarea.fecha = new Date();
        const collectionTareas = conexion_1.default.collection('tareas');
        const docModificado = yield collectionTareas.doc(params.id).update(tarea);
        if (!docModificado) {
            return res.status(400).json({
                msg: 'No se pudo modificar la tarea'
            });
        }
        res.json({
            status: true
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al modificar tarea'
        });
    }
});
exports.PutTarea = PutTarea;
const DeleteTarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.params;
        const collectionTareas = conexion_1.default.collection('tareas');
        const docEliminado = yield collectionTareas.doc(params.id).delete();
        console.log(docEliminado);
        if (!docEliminado) {
            return res.status(400).json({
                msg: 'No se pudo eliminar la tarea'
            });
        }
        res.json({
            status: true
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al eliminar tarea'
        });
    }
});
exports.DeleteTarea = DeleteTarea;
//# sourceMappingURL=tareas.js.map