
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { Almacen } from '../../models/almacen';
import { AlmacenService } from '../../services/almacen.service';

@Component({
  selector: 'almacen',
  standalone: true,
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './almacenes.component.html'
  
})
export class AlmacenesComponent implements OnInit {

  Title: string = 'Listado de Almacenes!';

  almacenes: Almacen[] = [];
  paginator: any = {};

  constructor(
    private service: AlmacenService,
    private sharingData: SharingDataService,
    private authService: AuthService,
    private router: Router,
  private route: ActivatedRoute) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.almacenes = this.router.getCurrentNavigation()?.extras.state!['almacenes'];
      this.paginator = this.router.getCurrentNavigation()?.extras.state!['paginator'];
    }
  }

  ngOnInit(): void {
    if (this.almacenes == undefined || this.almacenes == null || this.almacenes.length == 0) {
      console.log('consulta findAll')
      // this.service.findAll().subscribe(clientes => this.clientes = clientes);
      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        console.log(page)
        this.service.findAllPageable(page).subscribe(pageable => {
          this.almacenes = pageable.content as Almacen[];
          this.paginator = pageable;
          this.sharingData.pageAlmacenesEventEmitter.emit({almacenes: this.almacenes, paginator: this.paginator});
        });
      })
    }
  }
//@Output () idProveedorEventEmitter = new EventEmitter();
  onRemoveAlmacen(id: number): void {
    this.sharingData.idAlmacenEventEmitter.emit(id);
   //const confirmRemove = confirm ('Esta seguro que desea eliminar')
   // if (confirmRemove){
    // this.idClientesEventEmitter.emit(id);
  //  }

  }

  onSelectedEmpleado(almacen: Almacen): void {
    this.router.navigate(['/almacenes/edit', almacen.id]);
  }

  get admin() {
    return this.authService.isAdmin();
  }
}