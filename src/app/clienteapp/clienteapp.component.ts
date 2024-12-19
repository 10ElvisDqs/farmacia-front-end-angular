import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ActivatedRoute, Router,RouterOutlet } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { SharingDataService } from '../services/sharing-data.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { NavbarComponent } from "../components/navbar/navbar.component";

@Component({
  selector: 'app-clienteapp',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './clienteapp.component.html',
  styleUrl: './clienteapp.component.css'
})
export class ClienteappComponent implements OnInit {


  clientes: Cliente []=[];
  paginator: any = {};
  



  constructor(
    private router: Router,
    private service: ClienteService,
    private sharingData: SharingDataService,
    private authService: AuthService,
  private route: ActivatedRoute) {
    
  }
  ngOnInit(): void {
    //this.service.findAll().subscribe(clientes => this.clientes = clientes);
    this.addCliente();
    this.removeCliente();
    this.findClienteById();
    this.pageClienteEvent();
  }

  pageClienteEvent() {
    this.sharingData.pageClientesEventEmitter.subscribe(pageable => {
      this.clientes = pageable.users;
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
              this.clientes = this.clientes.map(c => (c.id == clienteUpdated.id) ? { ...clienteUpdated } : c);
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

  addClient() {
    this.sharingData.newClienteEventEmitter.subscribe(Cliente => {
      if (Cliente.id > 0) {
        this.service.update(Cliente).subscribe(clienteUpdated => {
          this.clientes = this.clientes.map(u => (u.id == clienteUpdated.id) ? { ...clienteUpdated } : u);
          this.router.navigate(['/clientes'], {state: {users: this.clientes}});
        })

      } else {
        this.service.create(Cliente).subscribe(clienteNew => {
          console.log(Cliente)
          this.clientes = [... this.clientes, { ...clienteNew }];

          this.router.navigate(['/clientes'], {state: {clientes: this.clientes}});
        })
      }
      Swal.fire({
        title: "Guardado!",
        text: "Usuario guardado con exito!",
        icon: "success"
      });
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

}


