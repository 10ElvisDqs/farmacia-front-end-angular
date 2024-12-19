import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'empleado-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './empleado-form.component.html',

})
export class EmpleadoFormComponent implements OnInit {

 
  empleado: Empleado;
 errors: any = {};
  
  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingDataService,
    private service: EmpleadoService){

      this.empleado = new Empleado();
    }
  ngOnInit(): void {

    this.sharingData.errorsEmpleadoFormEventEmitter.subscribe(errors => this.errors = errors);
    this.sharingData.selectEmpleadoEventEmitter.subscribe(empleado => this.empleado = empleado);
    
    this.route.paramMap.subscribe(params => {
      const id:number = +(params.get('id') || '0');

      if (id>0){
        this.sharingData.findEmpleadoByIdEventEmitter.emit(id);
      }
    })
  }

  

  onSubmit1(empleadoForm: NgForm): void {
     // if (clienteForm.valid) {
        this.sharingData.newEmpleadoEventEmitter.emit(this.empleado);
        console.log(this.empleado);
     // }
     //  clienteForm.reset();
      // clienteForm.resetForm();
    }
  
  onClear(empleadoForm: NgForm): void {
    this.empleado = new Empleado();
    empleadoForm.reset();
    empleadoForm.resetForm();
  }
}



