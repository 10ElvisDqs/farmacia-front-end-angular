//import { Factura } from "./models/factura";
import { Factura } from "./factura";
import { Medicamento } from "./medicamento";
import { Venta } from "./venta";


export class Cliente {
    id : number = 0 ;
    ci!:number ;
    nombre!:string;
    apellido!:string;
    telefono!:string;
    email!:string;
    genero!:string;
    edad!:number ;
    ventas: Array<Venta> = [];

}

