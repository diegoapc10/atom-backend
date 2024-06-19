import { Request, Response } from "express";
import db from '../db/conexion';
import { Tarea } from "../models/tarea";

export const GetTareas = async(req: Request, res: Response) => {
    try {
        const params = req.params;

        let tareas: Tarea[] = [];
        const collectionTareas = db.collection('tareas');
        const docTareas = await collectionTareas.where('usuarioRef','==',`usuarios/${params.usuario_ref}`);
        const ordenado = await docTareas.orderBy('fecha','desc').get();
        
        ordenado.forEach(doc => {
            let fecha = new Date(doc.data().fecha.toDate());
            const task = doc.data();
            task.id = doc.id;
            task.fecha = fecha;
            tareas.push(task as Tarea);
        });
        
        res.json({
            status: true,
            tareas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            msg: 'Error al obtener sus tareas'
        });
    }
}

export const PostTarea = async(req: Request, res: Response) => {
    try {
        const params = req.body;
        
        const tarea = {
            titulo: params.titulo,
            descripcion: params.descripcion,
            fecha:  new Date(),
            estado: false,
            usuarioRef: `usuarios/${params.usuario_ref}`
        }

        const collectionTareas = db.collection('tareas');
        const docTarea = await collectionTareas.add(tarea);

        if(!docTarea.id){
            return res.status(400).json({
                msg: 'Error al insertar la tarea'
            });
        }

        res.json({
            status: true,
            id: docTarea.id
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            msg: 'Error al insertar la tarea'
        });
    }

}

export const PutTarea = async(req: Request, res: Response) => {
    try {
        const params = req.params;
        const body = req.body;

        let tarea: any = {};

        if( body.titulo ){
            tarea.titulo = body.titulo;
        }

        if( body.descripcion ){
            tarea.descripcion = body.descripcion;
        }

        if( body.estado ){
            tarea.estado = body.estado;
        }

        tarea.fecha = new Date();

        const collectionTareas = db.collection('tareas');
        const docModificado = await collectionTareas.doc(params.id).update( tarea );

        if( !docModificado ){
            return res.status(400).json({
                msg: 'No se pudo modificar la tarea'
            });
        }

        res.json({
            status: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            msg: 'Error al modificar tarea'
        });
    }
}

export const DeleteTarea = async(req: Request, res: Response) => {
    try {
        const params = req.params;
    
        const collectionTareas = db.collection('tareas');
        const docEliminado = await collectionTareas.doc(params.id).delete();

        if( !docEliminado ){
            return res.status(400).json({
                msg: 'No se pudo eliminar la tarea'
            });
        }
        
        res.json({
            status: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            msg: 'Error al eliminar tarea'
        });
    }
}