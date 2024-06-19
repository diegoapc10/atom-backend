import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import db from '../db/conexion';
import { Usuario } from "../models/usuario";

export const validarJwt = async( req: any, res: Response, next: NextFunction ) => {
    let token: string = req.header('authorization');
    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        token = token.replace('Bearer ','');
        const payload: any = jwt.verify( token, process.env.SECRETORPRIVATEKEY as string );

        const collectionUsuarios = db.collection('usuarios');
        const docUsuario = await collectionUsuarios.doc(payload.id).get();

        if( !docUsuario ){
            return res.status(401).json({
                msg: 'token no valido - usuario no existe en bd'
            });
        }

        let usuario: Usuario = docUsuario.data() as Usuario;
        usuario.id = docUsuario.id;

        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Intento realizar una petición con un usuario eliminado'
            });
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'token no valido'
        });
    }
}