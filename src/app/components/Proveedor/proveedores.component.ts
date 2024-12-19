
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
//import { Proveedor } from './proveedor';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaginatorComponent } from '../paginator/paginator.component';
import { ClienteService } from '../../services/cliente.service';
import { AuthService } from '../../services/auth.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { Proveedor } from '../../models/proveedor';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'proveedor',
  standalone: true,
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './proveedores.component.html'
  
})
export class ProveedoresComponent implements OnInit {

  Title: string = 'Listado de proveedores!';

  proveedores: Proveedor[] = [];
  paginator: any = {};

  constructor(
    private service: ProveedorService,
    private sharingData: SharingDataService,
    private authService: AuthService,
    private router: Router,
  private route: ActivatedRoute) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.proveedores = this.router.getCurrentNavigation()?.extras.state!['proveedores'];
      this.paginator = this.router.getCurrentNavigation()?.extras.state!['paginator'];
    }
  }

  ngOnInit(): void {
    if (this.proveedores == undefined || this.proveedores == null || this.proveedores.length == 0) {
      console.log('consulta findAll')
      // this.service.findAll().subscribe(clientes => this.clientes = clientes);
      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        console.log(page)
        this.service.findAllPageable(page).subscribe(pageable => {
          this.proveedores = pageable.content as Proveedor[];
          this.paginator = pageable;
          this.sharingData.pageProveedoresEventEmitter.emit({proveedores: this.proveedores, paginator: this.paginator});
        });
      })
    }
  }
//@Output () idProveedorEventEmitter = new EventEmitter();
  onRemoveProveedor(id: number): void {
    this.sharingData.idProveedorEventEmitter.emit(id);
   //const confirmRemove = confirm ('Esta seguro que desea eliminar')
   // if (confirmRemove){
    // this.idClientesEventEmitter.emit(id);
  //  }

  }

  onSelectedProveedor(proveedor: Proveedor): void {
    this.router.navigate(['/proveedores/edit', proveedor.id]);
  }

  get admin() {
    return this.authService.isAdmin();
  }
}