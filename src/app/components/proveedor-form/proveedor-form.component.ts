import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';


import { Proveedor } from '../../models/proveedor';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'proveedor-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './proveedor-form.component.html',

})
export class ProveedorFormComponent implements OnInit {

 
  proveedor: Proveedor;
 errors: any = {};
  
  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingDataService,
    private service: ProveedorService){

      this.proveedor = new Proveedor();
    }
  ngOnInit(): void {

    this.sharingData.errorsProveedorFormEventEmitter.subscribe(errors => this.errors = errors);
    this.sharingData.selectProveedorEventEmitter.subscribe(proveedor => this.proveedor = proveedor);
    
    this.route.paramMap.subscribe(params => {
      const id:number = +(params.get('id') || '0');

      if (id>0){
        //this.service.findById(id).subscribe(cliente => this.cliente = cliente);
        this.sharingData.findProveedorByIdEventEmitter.emit(id);
      }
    })
  }

  

  onSubmit1(proveedorForm: NgForm): void {
     // if (clienteForm.valid) {
        this.sharingData.newProveedorEventEmitter.emit(this.proveedor);
        console.log(this.proveedor);
     // }
     //  clienteForm.reset();
      // clienteForm.resetForm();
    }
  
  onClear(proveedorForm: NgForm): void {
    this.proveedor = new Proveedor();
    proveedorForm.reset();
    proveedorForm.resetForm();
  }
}



