import express, { Application } from 'express';
import userRoutes from '../routes/usuario';
import authRoutes from '../routes/auth';
import tareaRoutes from '../routes/tarea';
import cors from 'cors';
import db from '../db/conexion';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        auth: '/api/auth',
        usuarios: '/api/users',
        tareas: '/api/tasks'
    };

    constructor(){
        this.app = express();
        this.port = process.env.PORT as string;

        // Motodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection(){

        try {
            let usuarios:any[] = []

            const collectionUsuarios = db.collection('usuarios');
            const docUsuarios = await collectionUsuarios.limit(1).get();
            docUsuarios.forEach(doc => {
                usuarios.push(doc.data());
            })

            if( usuarios.length === 0 ){
                throw new Error('Database Offine');
            } else {
                console.log('Database Online');
            }
        } catch (error: any) {
            throw new Error(error);
        }

    }

    middlewares(){
        // Cors
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );

        // Carpeta publica
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use( this.apiPaths.usuarios, userRoutes );
        this.app.use( this.apiPaths.auth, authRoutes );
        this.app.use( this.apiPaths.tareas, tareaRoutes );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }

}

export default Server;