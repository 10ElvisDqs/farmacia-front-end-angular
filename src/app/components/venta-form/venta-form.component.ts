import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlmacenService } from '../../services/almacen.service';
import { Venta } from '../../models/venta';
import { VentaService } from '../../services/venta.service';
import { MedicamentoService } from '../../services/medicamento.service';
// import { Medicamento } from '../../models/medicamento';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import {NgClass} from '@angular/common';
import { jsPDF } from 'jspdf';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'venta-form',
  standalone: true,
  imports: [FormsModule,FormsModule],
  templateUrl: './venta-form.component.html',



})
export class VentaFormComponent implements OnInit {


  venta: Venta;
  medicamentos: any[] = [];
  clientes: any[] = [];
  usuarios: any[] = [];
 errors: any = {};
 carrito: any[] = [];
  clienteId!: number; // Ejemplo
  usuarioId: number = 2; // Ejemplo
  cliente: any = null; // Cliente seleccionado
  medicamentoId!: number;
  medicamento: any = null;
  // Texto de búsqueda
  searchText: string = '';

  // Clientes filtrados
  filteredClients = [...this.clientes];

   // Medicamentos filtrados
   filteredMedicaments = [...this.medicamentos];

   filteredProducts = this.medicamentos;


  // Variables para mostrar el modal y manejar el item seleccionado
  showModal = false;
  itemSeleccionado: any = null;

  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingDataService,
    private usuarioService: UserService,
    private medicamentoService: MedicamentoService,
    private clienteService: ClienteService,
    private userauth: AuthService,
  ){

      this.venta = new Venta();
    }
  ngOnInit(): void {

   this.cargarMedicamentos();
   this.cargarClientes();
   this.cargarUsuarios();
   this.filterProducts();

  }

  ngOnChanges() {
    this.filterProducts();
  }

  // Capturar selección de cliente
  //onClientSelect(event: Event) {
    //const selectElement = event.target as HTMLSelectElement;
    //this.clienteId = Number(selectElement.value);
    //console.log('Cliente seleccionado ID:', this.clienteId);
  //}


  onClientSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.clienteId = Number(selectElement.value);
    console.log('Cliente seleccionado ID:', this.clienteId);

    // Obtener el cliente completo usando el clienteId
    this.cliente = this.clientes.find(cliente => cliente.id === this.clienteId);
    console.log('Cliente seleccionado:', this.cliente);
  }

  onMedicamentoSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.medicamentoId = Number(selectElement.value);
    console.log('Medicamento seleccionado ID:', this.medicamentoId);

    // Obtener el cliente completo usando el clienteId
    this.medicamento = this.medicamentos.find(medicamento => medicamento.id === this.medicamentoId);
    console.log('Medicamento seleccionado:', this.medicamento);
  }

  // Filtrar clientes según el texto ingresado

  filterClients() {
    console.log(this.clientes)
    this.filteredClients = this.clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
      cliente.paterno.toLowerCase().includes(this.searchText.toLowerCase())
    );
    // Lógica para seleccionar automáticamente si el cliente existe en los resultados
    const clienteEncontrado = this.filteredClients.find(cliente =>
      cliente.nombre.toLowerCase() === this.searchText.toLowerCase() ||
      cliente.paterno.toLowerCase() === this.searchText.toLowerCase()
    );

    if (clienteEncontrado) {
      this.clienteId = clienteEncontrado.id; // Actualiza el idCliente automáticamente
    }
  }

  cargarMedicamentos():void{
    this.medicamentoService.findAll().subscribe(
      (data) => {
        this.medicamentos = data; // Asignamos los datos a la variable medicamentos
        this.filteredProducts = this.medicamentos;
        console.log('Medicamentos obtenidos:', this.medicamentos);
      },
      (error) => {
        console.error('Error al obtener los medicamentos:', error);
      }
    );

  }


  cargarClientes():void {
    this.clienteService.findAll().subscribe(
      (data) => {

        this.clientes = data; // Asignamos los datos a la variable
        console.log('Clientes obtenidos:', this.clientes);
        this.filteredClients = [...this.clientes];
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

// Función para buscar cliente por nombre
buscarClientesPorNombre(nombre: string) {
  return this.clientes.find(cliente => cliente.nombre === nombre);
};

// Función para buscar cliente por nombre
buscarClientesPorCi(ci: string) {
  return this.clientes.find(cliente => cliente.ci === ci);
};

  onClear(ventaForm: any): void {
    this.venta = new Venta();
    ventaForm.reset();
    ventaForm.resetForm();
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
    const detalleVentas = this.carrito.map((item) => ({
      medicamentoId: item.id,
      cantidadTipo: item.cantidad
    }));

    const ventaData = {
      detalleVentas,
      clienteId: this.clienteId,
      usuarioId: this.usuarioId
    };

    console.log(ventaData);

    //this.ventaservice.create(data);
    this.sharingData.newVentaEventEmitter.emit(ventaData);
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
    console.log(this.itemSeleccionado);
  }
  this.cerrarModal();
}

  // Método que simula guardar la venta y generar el PDF

  guardarPDF() {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    // Logotipo
    const logoURL = 'https://img.icons8.com/?size=100&id=49491&format=png&color=000000';
    doc.addImage(logoURL, 'PNG', 15, 10, 30, 30);

    // Encabezado
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(38, 38, 38);
    doc.text("Farmacia Betania", 60, 25);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Dirección: Mercado Popular", 60, 32);
    doc.text("Teléfono: (591) 776-526902", 60, 38);

    // Línea divisoria decorativa
    doc.setDrawColor(38, 38, 38);
    doc.setLineWidth(0.5);
    doc.line(15, 45, 195, 45);

    // Sección de Cliente
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(38, 38, 38);
    doc.text("Información del Cliente", 15, 60);

    if (this.cliente) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Cliente: ${this.cliente.nombre} ${this.cliente.paterno}`, 15, 68);
        doc.text(`CI: ${this.cliente.ci}`, 15, 74);
    } else {
        doc.setFontSize(12);
        doc.text("Cliente: No seleccionado", 15, 68);
    }

    // Tabla encabezado
    const tableStartY = 90;
    doc.setFillColor(58, 134, 255); // Azul vibrante
    doc.setTextColor(255, 255, 255);
    doc.rect(15, tableStartY, 180, 10, "F");

    doc.setFontSize(12);
    doc.text("Artículo", 20, tableStartY + 7);
    doc.text("Cantidad", 90, tableStartY + 7);
    doc.text("Precio Unit.", 130, tableStartY + 7);
    doc.text("Total", 170, tableStartY + 7, { align: "right" });

    // Cuerpo de la tabla
    let y = tableStartY + 15;
    this.carrito.forEach((item, index) => {
        doc.setTextColor(0, 0, 0);
        if (index % 2 === 0) {
            doc.setFillColor(240, 240, 240); // Fondo gris claro para filas pares
            doc.rect(15, y - 5, 180, 8, "F");
        }
        doc.text(item.nombre, 20, y);
        doc.text(item.cantidad.toString(), 90, y);
        doc.text(item.precio.toFixed(2), 130, y);
        doc.text((item.cantidad * item.precio).toFixed(2), 190, y, { align: "right" });
        y += 8;
    });

    // Total
    const total = this.calcularTotal();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(38, 38, 38);
    doc.text("Total de la Venta:", 120, y + 10);
    doc.text(total.toFixed(2) + " Bs.", 190, y + 10, { align: "right" });

    // Guardar el archivo PDF
    doc.save("nota-venta-genial.pdf");
}


  guardarVentaYGenerarPDF() {
    if (!this.cliente) {
      alert('Por favor, seleccione un cliente antes de guardar la venta.');
      return;
    }

    // 2. Generar el PDF
    this.guardarPDF();
    // 1. Guardar la venta
    this.guardarVenta();

  }


  filterMedicamentos() {
    if (this.searchText) {
      this.filteredMedicaments = this.medicamentos.filter(medicamento =>
        medicamento.nombre.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredMedicaments = this.medicamentos; // Si no hay texto, mostrar todos
    }
  }

  filterProducts() {

    if (this.searchText.trim() === '') {
      this.filteredProducts = this.medicamentos;
      console.log('medicamentos search: ',this.medicamentos)
    }else{
      this.filteredProducts = this.medicamentos.filter(producto =>
        producto.nombre.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    console.log(this.filteredProducts);
    // this.medicamentos = this.filteredProducts;
    console.log(this.medicamentos);
  }

}



