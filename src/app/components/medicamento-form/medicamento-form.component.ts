import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicamento } from '../../models/medicamento';
import { MedicamentoService } from '../../services/medicamento.service';
import { LaboratorioService } from '../../services/laboratorio.service';
import { Laboratorio } from '../../models/laboratorio';
import Swal from 'sweetalert2';

@Component({
  selector: 'medicamento-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './medicamento-form.component.html',

})
export class MedicamentoFormComponent implements OnInit {

 
  medicamento: Medicamento;
 errors: any = {};
 paginator: any = {};

 laboratorios: any[] = [];
 medicamentos: any[] = [];
 laboratorioId!: number; // Ejemplo
  // Texto de búsqueda
  searchText: string = '';
 
  // Clientes filtrados
  filteredLaboratorios = [...this.laboratorios];

  laboratorio: { id: number }; 
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sharingData: SharingDataService,
    private medicamentoservice: MedicamentoService,
    private Laboratorioservice: LaboratorioService){

      this.medicamento = new Medicamento();
      this.laboratorio = { id: 0 };
    }
  //ngOnInit(): void {

    //this.sharingData.errorsMedicamentoFormEventEmitter.subscribe(errors => this.errors = errors);
    //this.sharingData.selectMedicamentoEventEmitter.subscribe(medicamento => this.medicamento = medicamento);
    
   // this.route.paramMap.subscribe(params => {
     // const id:number = +(params.get('id') || '0');

      //if (id>0){
  
        //this.sharingData.findMedicamentoByIdEventEmitter.emit(id);
     // }
   // })
       //this.cargarMedicamentos();
        //this.cargarLaboratorios();

 // }


 ngOnInit(): void {
  // Verificamos si existe un parámetro de id en la ruta
  this.route.paramMap.subscribe(params => {
    const id = +params.get('id')!;
    if (id) {
      this.cargarMedicamento(id);  // Cargar el medicamento si hay un id
    }
  });

  this.cargarLaboratorios();
}

cargarMedicamento(id: number): void {
  this.medicamentoservice.findById(id).subscribe(
    (medicamento) => {
      this.medicamento = medicamento;
      console.log('Medicamento a editar:', this.medicamento);
    },
    (error) => {
      console.error('Error al cargar el medicamento:', error);
    }
  );
}
  

 // onSubmit1(medicamentoForm: NgForm): void {
   //  // if (clienteForm.valid) {
   //   this.sharingData.newMedicamentoEventEmitter.emit(this.medicamento);
    
       //console.log(this.medicamento);
    // // }
   //  //  clienteForm.reset();
    //  // clienteForm.resetForm();
   // }
    onSubmit1(medicamentoForm: NgForm): void {
      if (medicamentoForm.valid) {
        // Crear el objeto de medicamento con el formato correcto
        
        const medicamentoData = {
         nombre: this.medicamento.nombre,
        precio: Number(this.medicamento.precio), // Asegurarse de que precio es un número
         fechaVencimiento: new Date(this.medicamento.fechaVencimiento).toISOString(), // Convertir fecha a formato ISO
         viaAdministracion: this.medicamento.viaAdministracion,
        categoria: this.medicamento.categoria,
        laboratorio: {
         id: this.medicamento.laboratorioId // Colocamos el id del laboratorio en el objeto
        }
        };
    
        console.log('Medicamento a enviar:', medicamentoData);
    
        // Enviar a la API para crear el medicamento

        if (this.medicamento.id > 0) {
          this.medicamentoservice.update( medicamentoData).subscribe(
            (response) => {
              console.log('Medicamento actualizado:', response);
              this.router.navigate(['/medicamentos']);
              Swal.fire({
                title: "Medicamento actualizado!",
                text: "Medicamento actualizado con éxito!",
                icon: "success"
              });
            },
            (error) => {
              console.error('Error al actualizar medicamento:', error);
              Swal.fire({
                title: "Error",
                text: "No se pudo actualizar el medicamento.",
                icon: "error"
              });
            }
          );
        } else {
          // Si el id es 0, es una creación (en tu caso parece que usas el mismo formulario para crear y actualizar)

        

       
         this.medicamentoservice.create(medicamentoData).subscribe(
           (response) => {
            
              console.log('Medicamento creado:', response);
              this.router.navigate(['/medicamentos']);
           Swal.fire({
            title: "Creado nuevo medicamento!",
            text: "medicamento creado con exito!",
            icon: "success"
          });
            },
            (error) => {
             console.error('Error al crear medicamento', error);
            }
          );
        }
      }

    }


  
      
       
      

    
  
  onClear(medicamentoForm: NgForm): void {
    this.medicamento = new Medicamento();
    medicamentoForm.reset();
    medicamentoForm.resetForm();
  }



  // Capturar selección de laboratorio
  onLaboratorioSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.laboratorioId = Number(selectElement.value);
    console.log('Laboratorio seleccionado ID:', this.laboratorioId);
  }


  cargarMedicamentos():void{
    this.medicamentoservice.findAll().subscribe(
      (data) => {
        this.medicamentos = data; // Asignamos los datos a la variable medicamentos
        console.log('Medicamentos obtenidos:', this.medicamentos);
      },
      (error) => {
        console.error('Error al obtener los medicamentos:', error);
      }
    );
  }




  
  // Filtrar clientes según el texto ingresado

  filterLaboratorios() {
    console.log(this.laboratorios)
    this.filteredLaboratorios = this.laboratorios.filter(laboratorio =>
      laboratorio.nombre.toLowerCase().includes(this.searchText.toLowerCase()) 
      
    );
    // Lógica para seleccionar automáticamente si el cliente existe en los resultados
    const laboratorioEncontrado = this.filteredLaboratorios.find(laboratorio =>
      laboratorio.nombre.toLowerCase() === this.searchText.toLowerCase() 
     
    );

    if (laboratorioEncontrado) {
      this.laboratorioId = laboratorioEncontrado.id; // Actualiza el idCliente automáticamente
    }
  }

  
  cargarLaboratorios():void {
    this.Laboratorioservice.findAll().subscribe(
      (data) => {

        this.laboratorios = data; // Asignamos los datos a la variable
        console.log('Laboratorios obtenidos:', this.laboratorios);
        this.filteredLaboratorios = [...this.laboratorios];
      },
      (error) => {
        console.error('Error al obtener los laboratorios:', error);
      }
    );
  }




   //Función para buscar cliente por nombre
buscarClientesPorNombre(nombre: string) {
  return this.laboratorios.find(Laboratorio => Laboratorio.nombre === nombre);
};
}
