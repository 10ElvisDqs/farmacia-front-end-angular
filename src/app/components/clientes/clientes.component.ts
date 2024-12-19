
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaginatorComponent } from '../paginator/paginator.component';
import { ClienteService } from '../../services/cliente.service';
import { AuthService } from '../../services/auth.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { Medicamento } from '../../models/medicamento';

@Component({
  selector: 'cliente',
  standalone: true,
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './clientes.component.html'
  
})
export class ClientesComponent implements OnInit {

  Title: string = 'Listado de clientes!';

  clientes: Cliente[] = [];

  paginator: any = {};

  constructor(
    private service: ClienteService,
    private sharingData: SharingDataService,
    private authService: AuthService,
    private router: Router,
  private route: ActivatedRoute) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.clientes = this.router.getCurrentNavigation()?.extras.state!['clientes'];
      this.paginator = this.router.getCurrentNavigation()?.extras.state!['paginator'];
    }
  }

  ngOnInit(): void {
    if (this.clientes == undefined || this.clientes == null || this.clientes.length == 0) {
      console.log('consulta findAll')
      // this.service.findAll().subscribe(clientes => this.clientes = clientes);
      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        console.log(page)
        this.service.findAllPageable(page).subscribe(pageable => {
          this.clientes = pageable.content as Cliente[];
          this.paginator = pageable;
          this.sharingData.pageClientesEventEmitter.emit({clientes: this.clientes, paginator: this.paginator});
        });
      })
    }
  }
//@Output () idClientesEventEmitter = new EventEmitter();
  onRemoveCliente(id: number): void {
    this.sharingData.idClienteEventEmitter.emit(id);
   //const confirmRemove = confirm ('Esta seguro que desea eliminar')
   // if (confirmRemove){
    // this.idClientesEventEmitter.emit(id);
  //  }

  }

  onSelectedCliente(cliente: Cliente): void {
    this.router.navigate(['/clientes/edit', cliente.id]);
  }

  get admin() {
    return this.authService.isAdmin();
  }
}