import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'cliente-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cliente-form.component.html',

})
export class ClienteFormComponent implements OnInit {

 
 cliente: Cliente;
 errors: any = {};
  
  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingDataService,
    private service: ClienteService){

      this.cliente = new Cliente();
    }
  ngOnInit(): void {

    this.sharingData.errorsClienteFormEventEmitter.subscribe(errors => this.errors = errors);
    this.sharingData.selectClienteEventEmitter.subscribe(cliente => this.cliente = cliente);
    
    this.route.paramMap.subscribe(params => {
      const id:number = +(params.get('id') || '0');

      if (id>0){
        //this.service.findById(id).subscribe(cliente => this.cliente = cliente);
        this.sharingData.findClienteByIdEventEmitter.emit(id);
      }
    })
  }

  

  onSubmit(clienteForm: NgForm): void {
  
        this.sharingData.newClienteEventEmitter.emit(this.cliente);
        console.log(this.cliente);
  
    }
  
  onClear(clienteForm: NgForm): void {
    this.cliente = new Cliente();
    clienteForm.reset();
    clienteForm.resetForm();
  }
}



