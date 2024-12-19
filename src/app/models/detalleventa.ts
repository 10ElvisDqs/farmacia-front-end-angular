import { Medicamento } from "./medicamento";
import { Venta } from "./venta";

export class DetalleVenta {
    cantidad_tipo : number = 0 ;
    monto_tipo : number = 0 ;
    medicamentos: Array<Medicamento> = [];
    ventas: Array<Venta> = [];
    
    
    
}

