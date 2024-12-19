import { Medicamento } from "./medicamento";


export class ItemFactura {
  medicamento!: Medicamento;
  cantidad: number = 1;
  importe: number = 0;

  public calcularImporte(): number {
    return this.cantidad * this.medicamento.precio;
  }
}
