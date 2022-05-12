export class Usuario {

    _id?: number;
    nombre: string;
    correo: string;
    estado?: boolean;

    constructor(nombre: string, correo: string, estado: boolean){
        this.nombre = nombre;
        this.correo = correo;
        this.estado = estado;
    }
}