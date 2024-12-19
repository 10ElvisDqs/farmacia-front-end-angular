
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { Medicamento } from '../../models/medicamento';
import { MedicamentoService } from '../../services/medicamento.service';

@Component({
  selector: 'medicamento',
  standalone: true,
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './medicamentos.component.html'
  
})
export class MedicamentosComponent implements OnInit {

  Title: string = 'Listado de Medicamentos!';

  medicamentos: Medicamento[] = [];
  paginator: any = {};

  constructor(
    private service: MedicamentoService,
    private sharingData: SharingDataService,
    private authService: AuthService,
    private router: Router,
  private route: ActivatedRoute) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.medicamentos = this.router.getCurrentNavigation()?.extras.state!['medicamentos'];
      this.paginator = this.router.getCurrentNavigation()?.extras.state!['paginator'];
    }
  }

  ngOnInit(): void {
    if (this.medicamentos == undefined || this.medicamentos == null || this.medicamentos.length == 0) {
      console.log('consulta findAll')
      // this.service.findAll().subscribe(clientes => this.clientes = clientes);
      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        console.log(page)
        this.service.findAllPageable(page).subscribe(pageable => {
          this.medicamentos = pageable.content as Medicamento[];
          this.paginator = pageable;
          this.sharingData.pageMedicamentosEventEmitter.emit({medicamentos: this.medicamentos, paginator: this.paginator});
        });
      })
    }
  }
//@Output () idProveedorEventEmitter = new EventEmitter();
  onRemoveMedicamento(id: number): void {
    this.sharingData.idMedicamentoEventEmitter.emit(id);
   //const confirmRemove = confirm ('Esta seguro que desea eliminar')
   // if (confirmRemove){
    // this.idClientesEventEmitter.emit(id);
  //  }

  }

  onSelectedMedicamento(medicamento: Medicamento): void {
    this.router.navigate(['/medicamentos/edit', medicamento.id]);
  }

  get admin() {
    return this.authService.isAdmin();
  }
}