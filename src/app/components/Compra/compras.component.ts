
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { Almacen } from '../../models/almacen';
import { AlmacenService } from '../../services/almacen.service';
import { Compra } from '../../models/compra';
import { CompraService } from '../../services/compra.service';

@Component({
  selector: 'compra',
  standalone: true,
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './compras.component.html'
  
})
export class ComprasComponent implements OnInit {

  Title: string = 'Listado de Compras!';

  compras: Compra[] = [];
  

  paginator: any = {};

  constructor(
    private service: CompraService,
    private sharingData: SharingDataService,
    private authService: AuthService,
    private router: Router,
  private route: ActivatedRoute) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.compras = this.router.getCurrentNavigation()?.extras.state!['compras'];
      this.paginator = this.router.getCurrentNavigation()?.extras.state!['paginator'];
      
    }
  }

  ngOnInit(): void {
    if (this.compras == undefined || this.compras == null || this.compras.length == 0) {
      console.log('consulta findAll')
      // this.service.findAll().subscribe(clientes => this.clientes = clientes);
      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        console.log(page)
        this.service.findAllPageable(page).subscribe(pageable => {
          this.compras = pageable.content as Compra[];
          console.log(this.compras);
          this.paginator = pageable;
          this.sharingData.pageComprasEventEmitter.emit({compras: this.compras, paginator: this.paginator});
        });
      })
      
    }
 
  }
//@Output () idProveedorEventEmitter = new EventEmitter();
  onRemoveCompra(id: number): void {
    this.sharingData.idCompraEventEmitter.emit(id);
   //const confirmRemove = confirm ('Esta seguro que desea eliminar')
   // if (confirmRemove){
    // this.idClientesEventEmitter.emit(id);
  //  }

  }

  onSelectedCompra(compra: Compra): void {
    this.router.navigate(['/compras/edit', compra.id]);
  }

  get admin() {
    return this.authService.isAdmin();
  }
}