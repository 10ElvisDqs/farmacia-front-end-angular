
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { Almacen } from '../../models/almacen';
import { AlmacenService } from '../../services/almacen.service';
import { Compra } from '../../models/compra';
import { CompraService } from '../../services/compra.service';
import { Venta } from '../../models/venta';
import { VentaService } from '../../services/venta.service';
import { VentaModalComponent } from "../../venta-modal/venta-modal.component";

@Component({
  selector: 'venta',
  standalone: true,
  imports: [RouterModule, PaginatorComponent, VentaModalComponent],
  templateUrl: './ventas.component.html'

})
export class VentasComponent implements OnInit {
  Title: string = 'Listado de Ventas!';

  ventas: any[] = [];
  paginator: any = {};
  // selectedVenta: any = null;
  isModalOpen = false;
  selectedVenta: any;
  // @Output() isOpenChange = new EventEmitter<boolean>();

  constructor(
    private service: VentaService,
    private sharingData: SharingDataService,
    private authService: AuthService,
    private router: Router,
  private route: ActivatedRoute) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.ventas = this.router.getCurrentNavigation()?.extras.state!['ventas'];
      this.paginator = this.router.getCurrentNavigation()?.extras.state!['paginator'];
    }
  }

  ngOnInit(): void {
    if (this.ventas == undefined || this.ventas == null || this.ventas.length == 0) {
      console.log('consulta findAll')
      // this.service.findAll().subscribe(clientes => this.clientes = clientes);
      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        console.log(page)
        this.service.findAllPageable(page).subscribe(pageable => {
          this.ventas = pageable.content as Venta[];
          console.log(this.ventas);
          this.paginator = pageable;
          this.sharingData.pageVentasEventEmitter.emit({ventas: this.ventas, paginator: this.paginator});
        });
        console.log(this.ventas);
      })

    }
  }
//@Output () idProveedorEventEmitter = new EventEmitter();
  onRemoveVenta(id: number): void {
    this.sharingData.idVentaEventEmitter.emit(id);
   //const confirmRemove = confirm ('Esta seguro que desea eliminar')
   // if (confirmRemove){
    // this.idClientesEventEmitter.emit(id);
  //  }

  }

  onSelectedVenta(venta: Venta): void {
    this.router.navigate(['/ventas/edit', venta.id]);
  }

  get admin() {
    return this.authService.isAdmin();
  }




  // abrirDetalles(venta: any) {
  //   this.selectedVenta = venta; // Asignar datos
  //   // console.log("this.selectedVenta");
  //   // console.log(this.selectedVenta);

  // }
  openModal(venta: any) {
    this.selectedVenta = venta;
    this.isModalOpen = true;
    console.log(this.selectedVenta);
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedVenta = null;
  }
}
