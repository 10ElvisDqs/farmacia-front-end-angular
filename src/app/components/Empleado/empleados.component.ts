
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { Empleado } from '../../models/empleado';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'empleado',
  standalone: true,
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './empleados.component.html'
  
})
export class EmpleadosComponent implements OnInit {

  Title: string = 'Listado de empleados!';

  empleados: Empleado[] = [];
  paginator: any = {};

  constructor(
    private service: EmpleadoService,
    private sharingData: SharingDataService,
    private authService: AuthService,
    private router: Router,
  private route: ActivatedRoute) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.empleados = this.router.getCurrentNavigation()?.extras.state!['empleados'];
      this.paginator = this.router.getCurrentNavigation()?.extras.state!['paginator'];
    }
  }

  ngOnInit(): void {
    if (this.empleados == undefined || this.empleados == null || this.empleados.length == 0) {
      console.log('consulta findAll')
      // this.service.findAll().subscribe(clientes => this.clientes = clientes);
      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        console.log(page)
        this.service.findAllPageable(page).subscribe(pageable => {
          this.empleados = pageable.content as Empleado[];
          this.paginator = pageable;
          this.sharingData.pageEmpleadosEventEmitter.emit({empleados: this.empleados, paginator: this.paginator});
        });
      })
    }
  }

  onRemoveEmpleado(id: number): void {
    this.sharingData.idEmpleadoEventEmitter.emit(id);
   //const confirmRemove = confirm ('Esta seguro que desea eliminar')
   // if (confirmRemove){
    // this.idClientesEventEmitter.emit(id);
  //  }

  }

  onSelectedEmpleado(empleado: Empleado): void {
    this.router.navigate(['/empleados/edit', empleado.id]);
  }

  get admin() {
    return this.authService.isAdmin();
  }
}