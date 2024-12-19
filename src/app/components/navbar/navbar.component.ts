import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { Proveedor } from '../../models/proveedor';
import { ProveedorService } from '../../services/proveedor.service';
import { LaboratorioService } from '../../services/laboratorio.service';
import { Laboratorio} from '../../models/laboratorio';
import { Empleado } from '../../models/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { Almacen } from '../../models/almacen';
import { AlmacenService } from '../../services/almacen.service';
import { Medicamento } from '../../models/medicamento';
import { MedicamentoService } from '../../services/medicamento.service';
import { Venta } from '../../models/venta';
import { VentaService } from '../../services/venta.service';
import { DetalleVenta } from '../../models/detalleventa';
//import { DetalleVentaService } from '../../services/detalleventa.service';
import { CompraService } from '../../services/compra.service';
import { Compra } from '../../models/compra';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.component.html',

})
export class NavbarComponent {

  isSidebarOpen = false;

  constructor(private authService: AuthService,
    private router: Router,
    private clienteservice: ClienteService,
    private laboratorioservice: LaboratorioService,
    private proveedorservice: ProveedorService,
    private empleadoservice: EmpleadoService,
    private almaceneservice: AlmacenService,
    private medicamentoservice: MedicamentoService,
    private ventaservice: VentaService,
    private compraservice: CompraService,
   // private detalleventaservice: DetalleVentaService,

  ){}

  @Input() users: User[] = [];
  @Input() clientes: Cliente[] = [];
  @Input() proveedores: Proveedor[] = [];
  @Input() laboratorios: Laboratorio[] = [];
  @Input() empleados: Empleado[] = [];
  @Input() almacenes: Almacen[] = [];
  @Input() medicamentos: Medicamento[] = [];
  @Input() ventas: Venta[] = [];
  @Input() compras: Compra[] = [];
  //@Input() detalleventas: DetalleVenta[] = [];


  @Input() paginator = {}

  get login() {
    return this.authService.user;
  }

  get admin() {
    return this.authService.isAdmin();
  }



  handlerLogout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }



  // toggleSidebar() {
  //   this.isSidebarOpen = !this.isSidebarOpen;
  //   const navbar = document.getElementById('navbar');
  //   if (navbar) {
  //     if (this.isSidebarOpen) {
  //       navbar.classList.add('show');
  //     } else {
  //       navbar.classList.remove('show');
  //     }
  //   }
  // }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (this.isSidebarOpen) {
        navbar.classList.add('show');
      } else {
        navbar.classList.remove('show');
      }
    }
  }

}
