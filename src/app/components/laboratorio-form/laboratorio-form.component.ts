import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LaboratorioService } from '../../services/laboratorio.service';
import { Laboratorio } from '../../models/laboratorio';

@Component({
  selector: 'laboratorio-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './laboratorio-form.component.html',

})
export class LaboratorioFormComponent implements OnInit {

 
  laboratorio: Laboratorio;
 errors: any = {};
  
  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingDataService,
    private service: LaboratorioService){

      this.laboratorio = new Laboratorio();
    }
  ngOnInit(): void {

    this.sharingData.errorsLaboratorioFormEventEmitter.subscribe(errors => this.errors = errors);
    this.sharingData.selectLaboratorioEventEmitter.subscribe(laboratorio => this.laboratorio = laboratorio);
    
    this.route.paramMap.subscribe(params => {
      const id:number = +(params.get('id') || '0');

      if (id>0){
        //this.service.findById(id).subscribe(cliente => this.cliente = cliente);
        this.sharingData.findLaboratorioByIdEventEmitter.emit(id);
      }
    })
  }

  

  onSubmit2(laboratorioForm: NgForm): void {
     // if (clienteForm.valid) {
        this.sharingData.newLaboratorioEventEmitter.emit(this.laboratorio);
        console.log(this.laboratorio);
     // }
     //  clienteForm.reset();
      // clienteForm.resetForm();
    }
  
  onClear(laboratorioForm: NgForm): void {
    this.laboratorio = new Laboratorio();
    laboratorioForm.reset();
    laboratorioForm.resetForm();
  }
}



