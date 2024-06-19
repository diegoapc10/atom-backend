
export interface Tarea {
    id: string;
    titulo: string;
    descripcion: string;
    estado: boolean;
    fecha: Date;
    usuarioRef: any
}