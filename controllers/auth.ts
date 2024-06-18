import { Request, Response } from "express";
import db from '../db/conexion';
import { Usuario } from '../models/usuario';
import bcryptjs from 'bcryptjs'
import { generarJWT } from "../helpers/generarJWT";

export const login = async (req: Request, res: Response) => {
    try {
        let usuario: any;
        const { correo, password } = req.body;
        const collectionUsuarios = db.collection('usuarios');

        const documentos = await collectionUsuarios.where( 'correo','==', correo ).get();
        documentos.forEach(doc => {
            const user = doc.data();
            user.id = doc.id;
            usuario = user as Usuario
        })

        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg: 'El usuario se encuentra bloqueado'
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            status: true,
            token,
            usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            msg: 'Error en el login'
        })
    }
}