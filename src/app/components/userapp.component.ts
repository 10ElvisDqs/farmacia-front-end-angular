import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router,RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import { AuthService } from '../services/auth.service';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';
import { Proveedor } from '../models/proveedor';
import { ProveedorService } from '../services/proveedor.service';
import { ClientesComponent } from './clientes/clientes.component';
import { ProveedoresComponent } from './Proveedor/proveedores.component';
import { LaboratorioService } from '../services/laboratorio.service';
import { LaboratoriosComponent } from './Laboratorio/laboratorios.component';
import { Laboratorio } from '../models/laboratorio';
import { Empleado } from '../models/empleado';
import { EmpleadoService } from '../services/empleado.service';
import { Almacen } from '../models/almacen';
import { AlmacenService } from '../services/almacen.service';
import { Medicamento } from '../models/medicamento';
import { MedicamentoService } from '../services/medicamento.service';
import { VentaService } from '../services/venta.service';
import { Venta } from '../models/venta';
import { Factura } from '../models/factura';
import { FacturaService } from '../services/factura.service';
//import { DetalleVentaService } from '../services/detalleventa.service';
import { Compra } from '../models/compra';
import { CompraService } from '../services/compra.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './userapp.component.html',
  styleUrls: ['./user-app.component.css']

})
export class UserappComponent implements OnInit {


  users: User []=[];
  paginator: any = {};
  clientes: Cliente []=[];
  proveedores: Proveedor []=[];
  laboratorios: Laboratorio []=[];
  empleados : Empleado []= [];
  almacenes : Almacen []= [];
  medicamentos : Medicamento []= [];
  ventas : Venta []= [];
  facturas : Factura []= [];
  compras : Compra []= [];




  constructor(
    private router: Router,
    private services: UserService,
    private service: ClienteService,
    private service1: ProveedorService,
    private service2: LaboratorioService,
    private service3: EmpleadoService,
    private service4: AlmacenService,
    private service5: MedicamentoService,
    private service6: VentaService,
    //private service7: DetalleVentaService,
    private service8: CompraService,
    private sharingData: SharingDataService,
    private authService: AuthService,
  private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    //this.service.findAll().subscribe(users => this.users = users);
    this.addUser();
    this.removeUser();
    this.findUserById();
    this.pageUsersEvent();
    this.handlerLogin();

    this.addCliente();
    this.removeCliente();
    this.findClienteById();
    this.pageClienteEvent();

    this.addProveedor();
    this.removeProveedor();
    this.findProveedorById();
    this.pageProveedorEvent();


    this.addLaboratorio();
    this.removeLaboratorio();
    this.findLaboratorioById();
    this.pageLaboratorioEvent();


    this.addEmpleado();
    this.removeEmpleado();
    this.findEmpleadoById();
    this.pageEmpleadoEvent();



    this.addAlmacen();
    this.removeAlmacen();
    this.findAlmacenById();
    this.pageAlmacenEvent();




    this.addMedicamento();
    this.removeMedicamento();
    this.findMedicamentoById();
    this.pageMedicamentoEvent();


    this.addVenta();
    this.removeVenta();
    this.findVentaById();
    this.pageVentaEvent();






    this.addCompra();
    this.removeCompra();
    this.findCompraById();
    this.pageCompraEvent();

  }

  handlerLogin() {
    this.sharingData.handlerLoginEventEmitter.subscribe(({ username, password }) => {
      console.log(username + ' ' + password);

      this.authService.loginUser({ username, password }).subscribe({
        next: response => {
          const token = response.token;
          console.log(token);
          const payload = this.authService.getPayload(token);

          const user = { username: payload.sub };
          const login = {
            user,
            isAuth: true,
            isAdmin: payload.isAdmin
          };

          this.authService.token = token;
          this.authService.user = login;
          this.router.navigate(['/users/page/0']);
        },
        error: error => {
          if (error.status == 401) {
            Swal.fire('Error en el Login', error.error.message, 'error')
          } else {
            throw error;
          }
        }
      })
    })
  }

  pageUsersEvent() {
    this.sharingData.pageUsersEventEmitter.subscribe(pageable => {
      this.users = pageable.users;
      this.paginator = pageable.paginator;
    });
  }

  findUserById(){

    this.sharingData.findUserByIdEventEmitter.subscribe(id => {
      const user = this.users.find(user => user.id == id);

      this.sharingData.selectUserEventEmitter.emit(user);
    })
  }

  /* addUser() {
    this.sharingData.newUserEventEmitter.subscribe(user => {

      if (user.id >0){
          this.users = this.users.map(u => (u.id == user.id)? {... user} : u)
      } else {

        this.users = [... this.users, {... user, id: new Date().getTime()}];
      }
      this.router.navigate(['/users'], {state:{ users: this.users } });
       */
      addUser() {
        this.sharingData.newUserEventEmitter.subscribe(user => {
          if (user.id > 0) {
            this.services.update(user).subscribe(
              {
                next: (userUpdated) => {
                  this.users = this.users.map(u => (u.id == userUpdated.id) ? { ...userUpdated } : u);
                  this.router.navigate(['/users'], {
                    state: {
                      users: this.users,
                      paginator: this.paginator
                   } });

                  Swal.fire({
                    title: "Actualizado!",
                    text: "Usuario editado con exito!",
                    icon: "success"
                  });
                },
                error: (err) => {
                  // console.log(err.error)
                  if (err.status == 400) {
                    this.sharingData.errorsUserFormEventEmitter.emit(err.error);
                  }
                }
              })

          } else {
            this.services.create(user).subscribe( {
              next: userNew =>  {
              console.log(user)
              this.users = [... this.users, { ...userNew }];

                this.router.navigate(['/users'], {
                  state: {
                    users: this.users,
                    paginator: this.paginator
                 } });

                Swal.fire({
                  title: "Creado nuevo usuario!",
                  text: "Usuario creado con exito!",
                  icon: "success"
                });
              },
              error: (err) => {
                // console.log(err.error)
                // console.log(err.status)
                if (err.status == 400) {
                  this.sharingData.errorsUserFormEventEmitter.emit(err.error);
                }

            }})
          }

        })
      }
  removeUser(): void{
    this.sharingData.idUserEventEmitter.subscribe(id => {

      Swal.fire({
        title: "Seguro que quieres eliminar?",
        text: "Cuidado el Usuario sera eliminado del sistema!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SI"
      }).then((result) => {
        if (result.isConfirmed) {

          this.services.remove(id).subscribe(() => {
            this.users = this.users.filter(user => user.id != id);
            this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/users'], { state: { users: this.users,paginator: this.paginator} });
            });
          })

          Swal.fire({
            title: "Eliminado!",
            text: "Usuario Elimminado con exito.",
            icon: "success"
          });
        }
     });
    });
  }

  pageClienteEvent() {
    this.sharingData.pageClientesEventEmitter.subscribe(pageable => {
      this.clientes = pageable.clientes;
      this.paginator = pageable.paginator;
    });
  }

  findClienteById() {
    this.sharingData.findClienteByIdEventEmitter.subscribe(id => {

      const cliente = this.clientes.find(cliente => cliente.id == id);

      this.sharingData.selectUserEventEmitter.emit(cliente);
    })
  }

  addCliente() {
    this.sharingData.newClienteEventEmitter.subscribe(cliente => {
      if (cliente.id > 0) {
        this.service.update(cliente).subscribe(
          {
            next: (clienteUpdated) => {
              this.clientes = this.clientes.map(u => (u.id == clienteUpdated.id) ? { ...clienteUpdated } : u);
              this.router.navigate(['/clientes'], {
                state: {
                  clientes: this.clientes,
                  paginator: this.paginator
               } });

              Swal.fire({
                title: "Actualizado!",
                text: "Cliente editado con exito!",
                icon: "success"
              });
            },
            error: (err) => {
              // console.log(err.error)
              if (err.status == 400) {
                this.sharingData.errorsClienteFormEventEmitter.emit(err.error);
              }
            }
          })

      } else {
        this.service.create(cliente).subscribe( {
          next: clienteNew =>  {
          console.log(cliente)
          this.clientes = [... this.clientes, { ...clienteNew }];

            this.router.navigate(['/clientes'], {
              state: {
                clientes: this.clientes,
                paginator: this.paginator
             } });

            Swal.fire({
              title: "Creado nuevo Cliente!",
              text: "Cliente creado con exito!",
              icon: "success"
            });
          },
          error: (err) => {
            // console.log(err.error)
            // console.log(err.status)
            if (err.status == 400) {
              this.sharingData.errorsClienteFormEventEmitter.emit(err.error);
            }

        }})
      }

    })
  }

  removeCliente(): void {
    this.sharingData.idClienteEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Seguro que quiere eliminar?",
        text: "Cuidado el usuario sera eliminado del sistema!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
      }).then((result) => {
        if (result.isConfirmed) {

          this.service.remove(id).subscribe(() => {
            this.clientes = this.clientes.filter(cliente => cliente.id != id);
            this.router.navigate(['/clientes/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/clientes'], { state: { clientes: this.clientes } });
            });
          })


          Swal.fire({
            title: "Eliminado!",
            text: "Usuario eliminado con exito.",
            icon: "success"
          });
        }
      });
    });
  }





  pageProveedorEvent() {
    this.sharingData.pageProveedoresEventEmitter.subscribe(pageable => {
      this.proveedores = pageable.proveedores;
      this.paginator = pageable.paginator;
    });
  }

  findProveedorById() {
    this.sharingData.findProveedorByIdEventEmitter.subscribe(id => {

      const proveedor = this.proveedores.find(proveedor => proveedor.id == id);

      this.sharingData.selectProveedorEventEmitter.emit(proveedor);
    })
  }

  addProveedor() {
    this.sharingData.newProveedorEventEmitter.subscribe(proveedor => {
      if (proveedor.id > 0) {
        this.service1.update(proveedor).subscribe(
          {
            next: (proveedorUpdated) => {
              this.proveedores = this.proveedores.map(u => (u.id == proveedorUpdated.id) ? { ...proveedorUpdated } : u);
              this.router.navigate(['/proveedores'], {
                state: {
                  proveedores: this.proveedores,
                  paginator: this.paginator
               } });

              Swal.fire({
                title: "Actualizado!",
                text: "proveedor editado con exito!",
                icon: "success"
              });
            },
            error: (err) => {
              // console.log(err.error)
              if (err.status == 400) {
                this.sharingData.errorsProveedorFormEventEmitter.emit(err.error);
              }
            }
          })

      } else {
        this.service1.create(proveedor).subscribe( {
          next: proveedorNew =>  {
          console.log(proveedor)
          this.proveedores = [... this.proveedores, { ...proveedorNew }];

            this.router.navigate(['/proveedores'], {
              state: {
                proveedores: this.proveedores,
                paginator: this.paginator
             } });

            Swal.fire({
              title: "Creado nuevo proveedor!",
              text: "proveedor creado con exito!",
              icon: "success"
            });
          },
          error: (err) => {
            // console.log(err.error)
            // console.log(err.status)
            if (err.status == 400) {
              this.sharingData.errorsProveedorFormEventEmitter.emit(err.error);
            }

        }})
      }

    })
  }

  removeProveedor(): void {
    this.sharingData.idProveedorEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Seguro que quiere eliminar?",
        text: "Cuidado el proveedor sera eliminado del sistema!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
      }).then((result) => {
        if (result.isConfirmed) {

          this.service1.remove(id).subscribe(() => {
            this.proveedores = this.proveedores.filter(proveedor => proveedor.id != id);
            this.router.navigate(['/proveedores/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/proveedores'], { state: { proveedores: this.proveedores } });
            });
          })


          Swal.fire({
            title: "Eliminado!",
            text: "proveedor eliminado con exito.",
            icon: "success"
          });
        }
      });
    });
  }







  pageLaboratorioEvent() {
    this.sharingData.pageLaboratoriosEventEmitter.subscribe(pageable => {
      this.laboratorios = pageable.laboratorios;
      this.paginator = pageable.paginator;
    });
  }

  findLaboratorioById() {
    this.sharingData.findLaboratorioByIdEventEmitter.subscribe(id => {

      const laboratorio = this.laboratorios.find(laboratorio => laboratorio.id == id);

      this.sharingData.selectLaboratorioEventEmitter.emit(laboratorio);
    })
  }

  addLaboratorio() {
    this.sharingData.newLaboratorioEventEmitter.subscribe(laboratorio => {
      if (laboratorio.id > 0) {
        this.service2.update(laboratorio).subscribe(
          {
            next: (laboratorioUpdated) => {
              this.laboratorios = this.laboratorios.map(u => (u.id == laboratorioUpdated.id) ? { ...laboratorioUpdated } : u);
              this.router.navigate(['/laboratorios'], {
                state: {
                  laboratorios: this.laboratorios,
                  paginator: this.paginator
               } });

              Swal.fire({
                title: "Actualizado!",
                text: "laboratorio editado con exito!",
                icon: "success"
              });
            },
            error: (err) => {
              // console.log(err.error)
              if (err.status == 400) {
                this.sharingData.errorsLaboratorioFormEventEmitter.emit(err.error);
              }
            }
          })

      } else {
        this.service2.create(laboratorio).subscribe( {
          next: laboratorioNew =>  {
          console.log(laboratorio)
          this.laboratorios = [... this.laboratorios, { ...laboratorioNew }];

            this.router.navigate(['/laboratorios'], {
              state: {
                laboratorios: this.laboratorios,
                paginator: this.paginator
             } });

            Swal.fire({
              title: "Creado nuevo laboratorio!",
              text: "laboratorio creado con exito!",
              icon: "success"
            });
          },
          error: (err) => {
            // console.log(err.error)
            // console.log(err.status)
            if (err.status == 400) {
              this.sharingData.errorsLaboratorioFormEventEmitter.emit(err.error);
            }

        }})
      }

    })
  }

  removeLaboratorio(): void {
    this.sharingData.idLaboratorioEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Seguro que quiere eliminar?",
        text: "Cuidado el laboratorio sera eliminado del sistema!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
      }).then((result) => {
        if (result.isConfirmed) {

          this.service2.remove(id).subscribe(() => {
            this.laboratorios = this.laboratorios.filter(laboratorio => laboratorio.id != id);
            this.router.navigate(['/laboratorios/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/laboratorios'], { state: { laboratorios: this.laboratorios } });
            });
          })


          Swal.fire({
            title: "Eliminado!",
            text: "laboratorio eliminado con exito.",
            icon: "success"
          });
        }
      });
    });
  }






  pageEmpleadoEvent() {
    this.sharingData.pageEmpleadosEventEmitter.subscribe(pageable => {
      this.empleados = pageable.empleados;
      this.paginator = pageable.paginator;
    });
  }

  findEmpleadoById() {
    this.sharingData.findEmpleadoByIdEventEmitter.subscribe(id => {

      const empleado = this.empleados.find(empleado => empleado.id == id);

      this.sharingData.selectEmpleadoEventEmitter.emit(empleado);
    })
  }

  addEmpleado() {
    this.sharingData.newEmpleadoEventEmitter.subscribe(empleado => {
      if (empleado.id > 0) {
        this.service3.update(empleado).subscribe(
          {
            next: (empleadoUpdated) => {
              this.empleados = this.empleados.map(u => (u.id == empleadoUpdated.id) ? { ...empleadoUpdated } : u);
              this.router.navigate(['/empleados'], {
                state: {
                  empleados: this.empleados,
                  paginator: this.paginator
               } });

              Swal.fire({
                title: "Actualizado!",
                text: "empleado editado con exito!",
                icon: "success"
              });
            },
            error: (err) => {
              // console.log(err.error)
              if (err.status == 400) {
                this.sharingData.errorsEmpleadoFormEventEmitter.emit(err.error);
              }
            }
          })

      } else {
        this.service3.create(empleado).subscribe( {
          next: empleadoNew =>  {
          console.log(empleado)
          this.empleados = [... this.empleados, { ...empleadoNew }];

            this.router.navigate(['/empleados'], {
              state: {
                empleados: this.empleados,
                paginator: this.paginator
             } });

            Swal.fire({
              title: "Creado nuevo empleado!",
              text: "empleado creado con exito!",
              icon: "success"
            });
          },
          error: (err) => {
            // console.log(err.error)
            // console.log(err.status)
            if (err.status == 400) {
              this.sharingData.errorsEmpleadoFormEventEmitter.emit(err.error);
            }

        }})
      }

    })
  }

  removeEmpleado(): void {
    this.sharingData.idEmpleadoEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Seguro que quiere eliminar?",
        text: "Cuidado el empleado sera eliminado del sistema!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
      }).then((result) => {
        if (result.isConfirmed) {

          this.service3.remove(id).subscribe(() => {
            this.empleados = this.empleados.filter(empleado => empleado.id != id);
            this.router.navigate(['/empleados/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/empleados'], { state: { empleados: this.empleados } });
            });
          })


          Swal.fire({
            title: "Eliminado!",
            text: "empleado eliminado con exito.",
            icon: "success"
          });
        }
      });
    });
  }



  pageAlmacenEvent() {
    this.sharingData.pageAlmacenesEventEmitter.subscribe(pageable => {
      this.almacenes = pageable.almacenes;
      this.paginator = pageable.paginator;
    });
  }

  findAlmacenById() {
    this.sharingData.findAlmacenByIdEventEmitter.subscribe(id => {

      const almacen = this.almacenes.find(almacen => almacen.id == id);

      this.sharingData.selectAlmacenEventEmitter.emit(almacen);
    })
  }

  addAlmacen() {
    this.sharingData.newAlmacenEventEmitter.subscribe(almacen => {
      if (almacen.id > 0) {
        this.service4.update(almacen).subscribe(
          {
            next: (almacenUpdated) => {
              this.almacenes = this.almacenes.map(u => (u.id == almacenUpdated.id) ? { ...almacenUpdated } : u);
              this.router.navigate(['/almacenes'], {
                state: {
                  almacenes: this.almacenes,
                  paginator: this.paginator
               } });

              Swal.fire({
                title: "Actualizado!",
                text: "almacen editado con exito!",
                icon: "success"
              });
            },
            error: (err) => {
              // console.log(err.error)
              if (err.status == 400) {
                this.sharingData.errorsAlmacenFormEventEmitter.emit(err.error);
              }
            }
          })

      } else {
        this.service4.create(almacen).subscribe( {
          next: almacenNew =>  {
          console.log(almacen)
          this.almacenes = [... this.almacenes, { ...almacenNew }];

            this.router.navigate(['/almacenes'], {
              state: {
                almacenes: this.almacenes,
                paginator: this.paginator
             } });

            Swal.fire({
              title: "Creado nuevo Almacen!",
              text: "Almacen creado con exito!",
              icon: "success"
            });
          },
          error: (err) => {
            // console.log(err.error)
            // console.log(err.status)
            if (err.status == 400) {
              this.sharingData.errorsAlmacenFormEventEmitter.emit(err.error);
            }

        }})
      }

    })
  }

  removeAlmacen(): void {
    this.sharingData.idAlmacenEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Seguro que quiere eliminar?",
        text: "Cuidado el Almacen sera eliminado del sistema!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
      }).then((result) => {
        if (result.isConfirmed) {

          this.service4.remove(id).subscribe(() => {
            this.almacenes = this.almacenes.filter(almacen => almacen.id != id);
            this.router.navigate(['/almacenes/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/almacenes'], { state: { almacenes: this.almacenes } });
            });
          })


          Swal.fire({
            title: "Eliminado!",
            text: "Almacen eliminado con exito.",
            icon: "success"
          });
        }
      });
    });
  }





  pageMedicamentoEvent() {
    this.sharingData.pageMedicamentosEventEmitter.subscribe(pageable => {
      this.medicamentos = pageable.medicamentos;
      this.paginator = pageable.paginator;
    });
  }

  findMedicamentoById() {
    this.sharingData.findMedicamentoByIdEventEmitter.subscribe(id => {

      const medicamento = this.medicamentos.find(medicamento => medicamento.id == id);

      this.sharingData.selectMedicamentoEventEmitter.emit(medicamento);
    })
  }

  addMedicamento() {
    this.sharingData.newMedicamentoEventEmitter.subscribe(medicamento => {
      if (medicamento.id > 0) {
        this.service5.update(medicamento).subscribe(
          {
            next: (medicamentoUpdated) => {
              this.medicamentos = this.medicamentos.map(u => (u.id == medicamentoUpdated.id) ? { ...medicamentoUpdated } : u);
              this.router.navigate(['/medicamentos'], {
                state: {
                  medicamentos: this.medicamentos,
                  paginator: this.paginator
               } });

              Swal.fire({
                title: "Actualizado!",
                text: "medicamento editado con exito!",
                icon: "success"
              });
            },
            error: (err) => {
              // console.log(err.error)
              if (err.status == 400) {
                this.sharingData.errorsMedicamentoFormEventEmitter.emit(err.error);
              }
            }
          })

      } else {
        this.service5.create(medicamento).subscribe( {
          next: medicamentoNew =>  {
          console.log(medicamento)
          this.medicamentos = [... this.medicamentos, { ...medicamentoNew }];

            this.router.navigate(['/medicamentos'], {
              state: {
                medicamentos: this.medicamentos,
                paginator: this.paginator
             } });

            Swal.fire({
              title: "Creado nuevo medicamento!",
              text: "medicamento creado con exito!",
              icon: "success"
            });
          },
          error: (err) => {
            // console.log(err.error)
            // console.log(err.status)
            if (err.status == 400) {
              this.sharingData.errorsMedicamentoFormEventEmitter.emit(err.error);
            }

        }})
      }

    })
  }

  removeMedicamento(): void {
    this.sharingData.idMedicamentoEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Seguro que quiere eliminar?",
        text: "Cuidado el medicamento sera eliminado del sistema!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
      }).then((result) => {
        if (result.isConfirmed) {

          this.service5.remove(id).subscribe(() => {
            this.medicamentos = this.medicamentos.filter(medicamento => medicamento.id != id);
            this.router.navigate(['/medicamentos/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/medicamentos'], { state: { medicamentos: this.medicamentos } });
            });
          })


          Swal.fire({
            title: "Eliminado!",
            text: "medicamento eliminado con exito.",
            icon: "success"
          });
        }
      });
    });
  }







  pageVentaEvent() {
    this.sharingData.pageVentasEventEmitter.subscribe(pageable => {
      this.ventas = pageable.ventas;
      this.paginator = pageable.paginator;
    });
  }

  findVentaById() {
    this.sharingData.findVentaByIdEventEmitter.subscribe(id => {

      const venta = this.ventas.find(venta => venta.id == id);

      this.sharingData.selectVentaEventEmitter.emit(venta);
    })
  }

  addVenta() {
    this.sharingData.newVentaEventEmitter.subscribe(venta => {
      if (venta.id > 0) {
        this.service6.update(venta).subscribe(
          {
            next: (ventaUpdated) => {
              this.ventas = this.ventas.map(u => (u.id == ventaUpdated.id) ? { ...ventaUpdated } : u);
              this.router.navigate(['api/ventas'], {
                state: {
                  ventas: this.ventas,
                  paginator: this.paginator
               } });

              Swal.fire({
                title: "Actualizado!",
                text: "venta editado con exito!",
                icon: "success"
              });
            },
            error: (err) => {
              // console.log(err.error)
              if (err.status == 400) {
                this.sharingData.errorsVentaFormEventEmitter.emit(err.error);
              }
            }
          })

      } else {
        this.service6.create(venta).subscribe( {
          next: ventaNew =>  {
          console.log(venta)
          this.ventas = [... this.ventas, { ...ventaNew }];

            this.router.navigate(['ventas'], {
              state: {
                ventas: this.ventas,
                paginator: this.paginator
             } });

            Swal.fire({
              title: "Creado nuevo venta!",
              text: "venta creado con exito!",
              icon: "success"
            });
          },
          error: (err) => {
            // console.log(err.error)
            // console.log(err.status)
            if (err.status == 400) {
              this.sharingData.errorsVentaFormEventEmitter.emit(err.error);
            }

        }})
      }

    })
  }

  removeVenta(): void {
    this.sharingData.idVentaEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Seguro que quiere eliminar?",
        text: "Cuidado el venta sera eliminado del sistema!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
      }).then((result) => {
        if (result.isConfirmed) {

          this.service6.remove(id).subscribe(() => {
            this.ventas = this.ventas.filter(venta => venta.id != id);
            this.router.navigate(['/ventas/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/ventas'], { state: { ventas: this.ventas } });
            });
          })


          Swal.fire({
            title: "Eliminado!",
            text: "medicamento eliminado con exito.",
            icon: "success"
          });
        }
      });
    });
  }






  pageDetalleVentaEvent() {
    this.sharingData.pageDetalleVentasEventEmitter.subscribe(pageable => {
      this.facturas = pageable.facturas;
      this.paginator = pageable.paginator;
    });
  }

  findDetalleVentaById() {
    this.sharingData.findDetalleVentaByIdEventEmitter.subscribe(id => {

      const detalleventa = this.ventas.find(venta => venta.id == id);

      this.sharingData.selectDetalleVentaEventEmitter.emit(detalleventa);
    })
  }

  //addDetalleVenta() {
   // this.sharingData.newDetalleVentaEventEmitter.subscribe(DetalleVenta => {
    //  if (venta.id > 0) {
     //   this.service7.update(factura).subscribe(
      //    {
       //     next: (facturaUpdated) => {
            //  this.facturas = this.facturas.map(u => (u.id == facturaUpdated.id) ? { ...facturaUpdated } : u);
        //      this.router.navigate(['/ventas1'], {
          //      state: {
           //       facturas: this.facturas,
           //       paginator: this.paginator
           //    } });

           //   Swal.fire({
            //    title: "Actualizado!",
           //     text: "venta editado con exito!",
             //   icon: "success"
             // });
          //  },
           // error: (err) => {
              //// console.log(err.error)
          //    if (err.status == 400) {
           //     this.sharingData.errorsDetalleVentaFormEventEmitter.emit(err.error);
          //    }
          //  }
        //  })

     // } else {
    //    this.service7.create(detalleventa).subscribe( {
     //     next: facturaNew =>  {
     //     console.log(detalleventa)
     //    this.detalleventas = [... this.detalleventas, { ...detalleventaNew }];

      //      this.router.navigate(['/ventas1'], {
       //       state: {
         //       detalleventas: this.detalleventas,
         //       paginator: this.paginator
        //     } });

        //    Swal.fire({
        //      title: "Creado nuevo venta!",
         //     text: "venta creado con exito!",
          //    icon: "success"
        //    });
      //    },
         // error: (err) => {
        //    // console.log(err.error)
        //    // console.log(err.status)
         //   if (err.status == 400) {
        //      this.sharingData.errorsDetalleVentaFormEventEmitter.emit(err.error);
        //    }

      //  }})
    //  }
//
   // })
//  }

  removeFactura(): void {
    this.sharingData.idVentaEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Seguro que quiere eliminar?",
        text: "Cuidado el venta sera eliminado del sistema!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
      }).then((result) => {
        if (result.isConfirmed) {

          this.service6.remove(id).subscribe(() => {
            this.ventas = this.ventas.filter(venta => venta.id != id);
            this.router.navigate(['/ventas/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/ventas'], { state: { ventas: this.ventas } });
            });
          })


          Swal.fire({
            title: "Eliminado!",
            text: "medicamento eliminado con exito.",
            icon: "success"
          });
        }
      });
    });
  }







  pageCompraEvent() {
    this.sharingData.pageComprasEventEmitter.subscribe(pageable => {
      this.compras = pageable.compras;
      this.paginator = pageable.paginator;
    });
  }

  findCompraById() {
    this.sharingData.findCompraByIdEventEmitter.subscribe(id => {

      const compra = this.compras.find(compra => compra.id == id);

      this.sharingData.selectCompraEventEmitter.emit(compra);
    })
  }

  addCompra() {
    this.sharingData.newCompraEventEmitter.subscribe(compra => {
      if (compra.id > 0) {
        this.service8.update(compra).subscribe(
          {
            next: (compraUpdated) => {
              this.compras = this.compras.map(u => (u.id == compraUpdated.id) ? { ...compraUpdated } : u);
              this.router.navigate(['/compras'], {
                state: {
                  compras: this.compras,
                  paginator: this.paginator
               } });

              Swal.fire({
                title: "Actualizado!",
                text: "compra editado con exito!",
                icon: "success"
              });
            },
            error: (err) => {
              // console.log(err.error)
              if (err.status == 400) {
                this.sharingData.errorsCompraFormEventEmitter.emit(err.error);
              }
            }
          })

      } else {
        this.service8.create(compra).subscribe( {
          next: compraNew =>  {
          console.log(compra)
          this.compras = [... this.compras, { ...compraNew }];

            this.router.navigate(['/compras'], {
              state: {
                compras: this.compras,
                paginator: this.paginator
             } });

            Swal.fire({
              title: "Creado nuevo compra!",
              text: "compra creado con exito!",
              icon: "success"
            });
          },
          error: (err) => {
            // console.log(err.error)
            // console.log(err.status)
            if (err.status == 400) {
              this.sharingData.errorsCompraFormEventEmitter.emit(err.error);
            }

        }})
      }

    })
  }

  removeCompra(): void {
    this.sharingData.idCompraEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Seguro que quiere eliminar?",
        text: "Cuidado el compra sera eliminado del sistema!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
      }).then((result) => {
        if (result.isConfirmed) {

          this.service8.remove(id).subscribe(() => {
            this.compras = this.compras.filter(compra => compra.id != id);
            this.router.navigate(['/compras/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/compras'], { state: { compras: this.compras } });
            });
          })


          Swal.fire({
            title: "Eliminado!",
            text: "compra eliminado con exito.",
            icon: "success"
          });
        }
      });
    });
  }





}
