
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
//import { Proveedor } from './proveedor';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaginatorComponent } from '../components/paginator/paginator.component';
import { Laboratorio } from '../models/laboratorio';
import { LaboratorioService } from '../services/laboratorio.service';
import { SharingDataService } from '../services/sharing-data.service';
import { AuthService } from '../services/auth.service';
//import { PaginatorComponent } from '../paginator/paginator.component';
////import { AuthService } from '../../services/auth.service';
//import { SharingDataService } from '../../services/sharing-data.service';
//import { LaboratorioService } from '../../services/laboratorio.service';
//import { Laboratorio } from '../../models/laboratorio';

@Component({
  selector: 'laboratorio',
  standalone: true,
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './laboratorios.component.html'
  
})
export class LaboratoriosComponent implements OnInit {

  Nitle: string = 'Listado de Laboratorios!';

  laboratorios: Laboratorio[] = [];
  paginator: any = {};

  constructor(
    private service: LaboratorioService,
    private sharingData: SharingDataService,
    private authService: AuthService,
    private router: Router,
  private route: ActivatedRoute) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.laboratorios = this.router.getCurrentNavigation()?.extras.state!['laboratorios'];
      this.paginator = this.router.getCurrentNavigation()?.extras.state!['paginator'];
    }
  }

  ngOnInit(): void {
    if (this.laboratorios == undefined || this.laboratorios == null || this.laboratorios.length == 0) {
      console.log('consulta findAll')
      // this.service.findAll().subscribe(clientes => this.clientes = clientes);
      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        console.log(page)
        this.service.findAllPageable(page).subscribe(pageable => {
          this.laboratorios = pageable.content as Laboratorio[];
          this.paginator = pageable;
          this.sharingData.pageLaboratoriosEventEmitter.emit({laboratorios: this.laboratorios, paginator: this.paginator});
        });
      })
    }
  }
//@Output () idProveedorEventEmitter = new EventEmitter();
  onRemoveLaboratorio(id: number): void {
    this.sharingData.idLaboratorioEventEmitter.emit(id);
   //const confirmRemove = confirm ('Esta seguro que desea eliminar')
   // if (confirmRemove){
    // this.idClientesEventEmitter.emit(id);
  //  }

  }

  onSelectedLaboratorio(laboratorio: Laboratorio): void {
    this.router.navigate(['/laboratorios/edit', laboratorio.id]);
  }

  get admin() {
    return this.authService.isAdmin();
  }
}