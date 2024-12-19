import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Almacen } from '../../models/almacen';
import { AlmacenService } from '../../services/almacen.service';
import { Compra } from '../../models/compra';
import { CompraService } from '../../services/compra.service';
import { detalleCompra } from '../../models/detallecompra';
import { Medicamento } from '../../models/medicamento';
import { Proveedor } from '../../models/proveedor';
import { MedicamentoService } from '../../services/medicamento.service';
import { UserService } from '../../services/user.service';
import { ProveedorService } from '../../services/proveedor.service';
import { AuthService } from '../../services/auth.service';
import { NgClass } from '@angular/common';


@Component({
  selector: 'compra-form',
  standalone: true,
  imports: [FormsModule,NgClass,FormsModule],
  templateUrl: './compra-form.component.html',

})
export class CompraFormComponent implements OnInit {

 
  compra: Compra;
  medicamentos: Medicamento[] = [];
  proveedores: any[] = [];
  usuarios: any[] = [];
 errors: any = {};
 carrito: any[] = [];
  proveedorId!: number; // Ejemplo
  usuarioId: number = 2; // Ejemplo

  // Texto de búsqueda
  searchText: string = '';

  // Clientes filtrados
  
  
  filteredProveedor=[...this.proveedores];

  // Variables para mostrar el modal y manejar el item seleccionado
  showModal = false;
  itemSeleccionado: any = null;

 // itemSeleccionado: any = {
  //  cantidad: 1,
   // precio: 10.00
 // };
  
  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingDataService,
    private usuarioService: UserService,
    private medicamentoService: MedicamentoService,
    private proveedorService: ProveedorService,
    private userauth: AuthService,){

      this.compra = new Compra();
    }
    ngOnInit(): void {

      this.cargarMedicamentos();
      this.cargarProveedores();
      this.cargarUsuarios();
      
    
     }
  
 // Capturar selección de cliente
 onClientSelect(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  this.proveedorId = Number(selectElement.value);
  console.log('Proveedor seleccionado ID:', this.proveedorId);
}

// Filtrar clientes según el texto ingresado


  filteredProveedors(){
  console.log(this.proveedores)
  this.filteredProveedor = this.proveedores.filter(proveedor =>
    proveedor.nombre.toLowerCase().includes(this.searchText.toLowerCase()) 
    
  );
  // Lógica para seleccionar automáticamente si el cliente existe en los resultados
  const proveedorEncontrado = this.filteredProveedor.find(proveedor =>
    proveedor.nombre.toLowerCase() === this.searchText.toLowerCase() 
    
  );

  if (proveedorEncontrado) {
    this.proveedorId = proveedorEncontrado.id; // Actualiza el idCliente automáticamente
  }
}

cargarMedicamentos():void{
  this.medicamentoService.findAll().subscribe(
    (data) => {
      this.medicamentos = data; // Asignamos los datos a la variable medicamentos
      console.log('Medicamentos obtenidos:', this.medicamentos);
    },
    (error) => {
      console.error('Error al obtener los medicamentos:', error);
    }
  );
} 


cargarProveedores():void {
  this.proveedorService.findAll().subscribe(
    (data) => {
      
      this.proveedores = data; // Asignamos los datos a la variable medicamentos
      console.log('proveedores obtenidos:', this.proveedores);
      this.filteredProveedor = [...this.proveedores];
    },
    (error) => {
      console.error('Error al obtener los clientes:', error);
    }
  );
}


cargarUsuarios():void {
  this.usuarioService.findAll().subscribe(
    (data) => {
      
      this.usuarios = data; // Asignamos los datos a la variable usuarios
      console.log('Usuarios obtenidos:', this.usuarios);
   
    },
    (error) => {
      console.error('Error al obtener los usuarios:', error);
    }
  );
}



// Función para buscar cliente por nombre
buscarUsuariosPorNombre(nombre: string) {
return this.usuarios.find(usuario => usuario.username === nombre);
};

onClear(compraForm: NgForm): void {
  this.compra = new Compra();
  compraForm.reset();
  compraForm.resetForm();
}

agregarAlCarrito(medicamento: any) {
  const item = this.carrito.find((item) => item.id === medicamento.id);
  if (item) {
    item.cantidad++;
  } else {
    this.carrito.push({ ...medicamento, cantidad: 1 });
  }
}

eliminarItem(item: any) {
  this.carrito = this.carrito.filter((producto) => producto.id !== item.id);
}

editarItem(item: any){
console.log(item);
}

calcularTotal(): number {
  return this.carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

guardarVenta() {
 const user=this.userauth.user;
 console.log(user.user.username);
const x= this.buscarUsuariosPorNombre(user.user.username);
 console.log(x.id);
 this.usuarioId=x.id;
  const detalleCompras = this.carrito.map((item) => ({
    medicamentoId: item.id,
    cantidadTipo: item.cantidad
  }));

  const compraData = {
    detalleCompras,
    proveedorId: this.proveedorId,
    usuarioId: this.usuarioId
  };

  console.log(compraData);
 
  //this.ventaservice.create(data);
  this.sharingData.newCompraEventEmitter.emit(compraData);
  //this.sharingData.newMedicamentoEventEmitter.emit(this.medicamento);
  
 // this.router.navigate(['/ventas']);


}

// Función para abrir el modal de edición
abrirModalEditar(item: any) {
  this.itemSeleccionado = { ...item }; // Creamos una copia para evitar cambios directos
  this.showModal = true;
}

// Función para cerrar el modal
cerrarModal() {
  this.showModal = false;
  this.itemSeleccionado = null;
}

// Función para guardar los cambios en la cantidad
guardarCambios() {
  const index = this.carrito.findIndex(item => item.id === this.itemSeleccionado.id);

  if (index !== -1) {
    
    this.carrito[index].cantidad = this.itemSeleccionado.cantidad;
    console.log(this.carrito);
    //this.carrito[index].precio = this.itemSeleccionado.precio;
    console.log(this.itemSeleccionado);
  
  }
  this.cerrarModal();
}


}






