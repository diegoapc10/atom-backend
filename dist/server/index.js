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
const express_1 = __importDefault(require("express"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const auth_1 = __importDefault(require("../routes/auth"));
const tarea_1 = __importDefault(require("../routes/tarea"));
const cors_1 = __importDefault(require("cors"));
const conexion_1 = __importDefault(require("../db/conexion"));
class Server {
    constructor() {
        this.apiPaths = {
            auth: '/api/auth',
            usuarios: '/api/users',
            tareas: '/api/tasks'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        // Motodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let usuarios = [];
                const collectionUsuarios = conexion_1.default.collection('usuarios');
                const docUsuarios = yield collectionUsuarios.limit(1).get();
                docUsuarios.forEach(doc => {
                    usuarios.push(doc.data());
                });
                if (usuarios.length === 0) {
                    throw new Error('Database Offine');
                }
                else {
                    console.log('Database Online');
                }
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        // Cors
        this.app.use((0, cors_1.default)());
        // Lectura del body
        this.app.use(express_1.default.json());
        // Carpeta publica
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuario_1.default);
        this.app.use(this.apiPaths.auth, auth_1.default);
        this.app.use(this.apiPaths.tareas, tarea_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=index.js.map