import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { authGuard } from './components/guards/auth.guard';
import { AuthComponent } from './components/auth.component';
import { Forbidden403Component } from './components/forbidden403/forbidden403.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { ProveedoresComponent } from './components/Proveedor/proveedores.component';
import { ProveedorFormComponent } from './components/proveedor-form/proveedor-form.component';
import { LaboratoriosComponent } from './components/Laboratorio/laboratorios.component';
import { LaboratorioFormComponent } from './components/laboratorio-form/laboratorio-form.component';
import { EmpleadosComponent } from './components/Empleado/empleados.component';
import { EmpleadoFormComponent } from './components/empleado-form/empleado-form.component';
import { AlmacenesComponent } from './components/Almacen/almacenes.component';
import { AlmacenFormComponent } from './components/almacen-form/almacen-form.component';
import { MedicamentosComponent } from './components/Medicamento/medicamentos.component';
import { MedicamentoFormComponent } from './components/medicamento-form/medicamento-form.component';
//import { VentasComponent } from './components/Venta/ventas.component';
import { VentaFormComponent } from './components/venta-form/venta-form.component';
import { ComprasComponent } from './components/Compra/compras.component';
import { CompraFormComponent } from './components/compra-form/compra-form.component';
import { VentasComponent } from './components/Venta/ventas.component';
import { ReportesComponent } from './components/Reporte/reportes.component';
import { ReporteInventarioComponent } from './components/reporteInventario/reporteInventario.component';



export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/users/page/0',

    },
    {
        path: 'users',
        component: UserComponent,
    },
    {
        path: 'users/page/:page',
        component: UserComponent,
    },
    {
        path: 'users/create',
        component: UserFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'users/edit/:id',
        component: UserFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: AuthComponent
    },
    {
        path: 'forbidden',
        component: Forbidden403Component
    },


    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/clientes/page/0'
    },
    {
        path: 'clientes',
        component: ClientesComponent,
    },
    {
        path: 'clientes/page/:page',
        component: ClientesComponent,
    },
    {
        path: 'clientes/create',
        component: ClienteFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'clientes/edit/:id',
        component: ClienteFormComponent,
        canActivate: [authGuard]
    },




    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/proveedores/page/0'
    },
    {
        path: 'proveedores',
        component: ProveedoresComponent,
    },
    {
        path: 'proveedores/page/:page',
        component: ProveedoresComponent,
    },
    {
        path: 'proveedores/create',
        component: ProveedorFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'proveedores/edit/:id',
        component: ProveedorFormComponent,
        canActivate: [authGuard]
    },





    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/laboratorios/page/0'
    },
    {
        path: 'laboratorios',
        component: LaboratoriosComponent,
    },
    {
        path: 'laboratorios/page/:page',
        component: LaboratoriosComponent,
    },
    {
        path: 'laboratorios/create',
        component: LaboratorioFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'laboratorios/edit/:id',
        component: LaboratorioFormComponent,
        canActivate: [authGuard]
    },




    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/empleados/page/0'
    },
    {
        path: 'empleados',
        component: EmpleadosComponent,
    },
    {
        path: 'empleados/page/:page',
        component: EmpleadosComponent,
    },
    {
        path: 'empleados/create',
        component: EmpleadoFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'empleados/edit/:id',
        component: EmpleadoFormComponent,
        canActivate: [authGuard]
    },





    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/almacenes/page/0'
    },
    {
        path: 'almacenes',
        component: AlmacenesComponent,
    },
    {
        path: 'almacenes/page/:page',
        component: AlmacenesComponent,
    },
    {
        path: 'almacenes/create',
        component: AlmacenFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'almacenes/edit/:id',
        component: AlmacenFormComponent,
        canActivate: [authGuard]
    },





    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/medicamentos/page/0'
    },
    {
        path: 'medicamentos',
        component: MedicamentosComponent,
    },
    {
        path: 'medicamentos/page/:page',
        component: MedicamentosComponent,
    },
    {
        path: 'medicamentos/create',
        component: MedicamentoFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'medicamentos/edit/:id',
        component: MedicamentoFormComponent,
        canActivate: [authGuard]
    },











    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/ventas/page/0'
    },
    {
        path: 'ventas',
        component: VentasComponent,
    },
    {
        path: 'ventas/page/:page',
        component: VentasComponent,
    },
    {
        path: 'ventas/create',
        component: VentaFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'ventas/edit/:id',
        component: VentaFormComponent,
        canActivate: [authGuard]
    },




    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/compras/page/0'
    },
    {
        path: 'compras',
        component: ComprasComponent,
    },
    {
        path: 'compras/page/:page',
        component: ComprasComponent,
    },
    {
        path: 'compras/create',
        component: CompraFormComponent,
        canActivate: [authGuard]
    },
    {
        path: 'compras/edit/:id',
        component: CompraFormComponent,
        canActivate: [authGuard]
    },


    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard/page/0'
    },
    {
        path: 'dashboard',
        component: ReportesComponent,
    },
    {
        path: 'dashboard/page/:page',
        component: ReportesComponent,
    },

    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/reporte-inventario/page/0'
    },
    {
        path: 'reporte-inventario',
        component: ReporteInventarioComponent,
    },
    {
        path: 'reporte-inventario/page/:page',
        component: ReporteInventarioComponent,
    },



];
