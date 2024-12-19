import { Cliente } from './cliente';
import { ItemFactura } from './item-factura';

export class Factura {
  id : number = 0 ;
  cantidadtotal: number = 0;
  fechaventa !: string; 
  montototal: number = 0;
  items: Array<ItemFactura> = [];
  cliente!: Cliente;
  total!: number;
  

  calcularGranTotal(): number {
    this.total = 0;
    this.items.forEach((item: ItemFactura) => {
      this.total += item.calcularImporte();
    });
    return this.total;
  }
}
