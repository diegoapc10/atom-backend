import { Request, Response } from "express";
import db from '../db/conexion';
import bcryptjs from 'bcryptjs'
import { Usuario } from '../models/usuario';


export const getUsuarios = async (req: Request, res: Response) => {
    try {
        let usuarios: Usuario[] = [];
        const collectionUsuarios = db.collection('usuarios');
        const documentos = await collectionUsuarios.get();
        documentos.forEach(doc => {
            const usuario = doc.data();
            usuario.id = doc.id;
            usuarios.push(usuario as Usuario);
        })

        res.json({
            usuarios
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener usuarios'
        })
    }
}

export const getUsuarioById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const collectionUsuarios = db.collection('usuarios');
        const docUsuario = await collectionUsuarios.doc(id).get();

        if( !docUsuario.exists ){
            return res.status(400).json({
                msg: 'El id ingresado no pertenece a ningún usuario'
            });
        }

        let usuario: Usuario = docUsuario.data() as Usuario;
        usuario.id = docUsuario.id;

        res.json({
            usuario
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener usuario'
        });
    }
}

export const getUsuarioByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;

        const collectionUsuarios = db.collection('usuarios');
        const docBuscado = await collectionUsuarios.where('correo','==', email).limit(1).get();

        let usuario;
        docBuscado.forEach(doc => {
            const user = doc.data();
            user.id = doc.id;
            usuario = user as Usuario;
        });

        res.json({
            usuario
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener el usuario'
        })
    }
}

export const postUsuario = async (req: Request, res: Response) => {
    try {
        const parametros = req.body;

        const salt = await bcryptjs.genSaltSync();
        parametros.password = await bcryptjs.hashSync( parametros.password, salt );

        let usuario = {
            nombre: parametros.nombre,
            correo: parametros.correo,
            password: parametros.password,
            estado: true
        }

        const collectionUsuarios = db.collection('usuarios');

        const docBuscado = await collectionUsuarios.where('correo','==',usuario.correo).get();
        let validarUsuario;
        docBuscado.forEach(querySnapshot => {
            validarUsuario = querySnapshot.data();
        })
        
        if(validarUsuario){
            return res.status(400).json({
                msg: 'Este correo ya fue registrado anteriormente, intente con otro correo'
            });
        }

        const resultCreate = await collectionUsuarios.add(usuario);

        if( !resultCreate.id ){
            return res.status(400).json({
                msg: 'No se pudo registrar el usuario en la BD'
            });
        }
        
        res.json({
            id: resultCreate.id
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Error al crear usuario'
        })
    }
}