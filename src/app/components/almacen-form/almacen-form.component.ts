import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Almacen } from '../../models/almacen';
import { AlmacenService } from '../../services/almacen.service';

@Component({
  selector: 'almacen-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './almacen-form.component.html',

})
export class AlmacenFormComponent implements OnInit {

 
  almacen: Almacen;
 errors: any = {};
  
  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingDataService,
    private service: AlmacenService){

      this.almacen = new Almacen();
    }
  ngOnInit(): void {

    this.sharingData.errorsAlmacenFormEventEmitter.subscribe(errors => this.errors = errors);
    this.sharingData.selectAlmacenEventEmitter.subscribe(almacen => this.almacen = almacen);
    
    this.route.paramMap.subscribe(params => {
      const id:number = +(params.get('id') || '0');

      if (id>0){
        //this.service.findById(id).subscribe(cliente => this.cliente = cliente);
        this.sharingData.findAlmacenByIdEventEmitter.emit(id);
      }
    })
  }

  

  onSubmit1(almacenForm: NgForm): void {
     // if (clienteForm.valid) {
        this.sharingData.newAlmacenEventEmitter.emit(this.almacen);
        console.log(this.almacen);
     // }
     //  clienteForm.reset();
      // clienteForm.resetForm();
    }
  
  onClear(almacenForm: NgForm): void {
    this.almacen = new Almacen();
    almacenForm.reset();
    almacenForm.resetForm();
  }
}



