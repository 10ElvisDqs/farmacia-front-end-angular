import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlmacenService } from '../../services/almacen.service';
import { CommonModule } from '@angular/common';
import { forkJoin, map } from 'rxjs';
import { jsPDF } from 'jspdf';


interface Medicamento {
  nombreMedicamento: string;
  stock: number;
}

interface Almacen {
  id: number;
  nombre: string;
  direccion: string;
  medicamentos: {
    nombreAlmacen: string;
    medicamentos: any[];
  };
  showDetails?: boolean; // propiedad para controlar la expansión
}

@Component({
  selector: 'app-reporte-inventario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reporteInventario.component.html',
  styleUrls: ['./reporteInventario.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReporteInventarioComponent implements OnInit {
  id_almacen: number = 1;
  almacenes: any[] = [];

  constructor(
    private almacenService: AlmacenService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Llamada al servicio para obtener todos los almacenes
    this.almacenService.findAll().subscribe(
      (almacenes) => {
        this.almacenes = almacenes; // Asigna los almacenes recibidos
        console.log(this.almacenes); // Muestra los almacenes en consola

        // Ahora que tenemos los almacenes, obtenemos los inventarios para cada uno de ellos
        const inventarioRequests = this.almacenes.map((almacen) => {
          // Aseguramos que la propiedad medicamentos esté definida antes de intentar asignarla
          if (!almacen.medicamentos) {
            almacen.medicamentos = { nombreAlmacen: almacen.nombre, medicamentos: [] }; // Inicializa medicamentos si no está definido
          }

          return this.almacenService.obtenerInventario(almacen.id).pipe(
            // Usamos el operador `map` para modificar cada almacen con su inventario
            map((medicamentos) => {
              almacen.medicamentos.medicamentos = medicamentos; // Asigna los medicamentos
            })
          );
        });

        // Usamos `forkJoin` para esperar a que todas las peticiones se completen
        forkJoin(inventarioRequests).subscribe(
          () => {
            console.log('Todos los inventarios fueron cargados.');
            this.cdRef.detectChanges(); // Forzar la detección de cambios solo una vez
          },
          (error) => {
            console.error('Error al obtener los inventarios:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener almacenes:', error);
      }
    );
  }

  toggleDetails(almacen: Almacen): void {
    almacen.showDetails = !almacen.showDetails; // Alternar la propiedad `showDetails`
  }

  // generatePDF(almacen:any):void{
  //   console.log(almacen);

  // }

  // Método para generar el PDF
  // Método para generar el PDF
  generatePDF(almacen: any): void {
    const doc = new jsPDF();

    // Añadir el logo
    const logoUrl = 'https://img.icons8.com/?size=100&id=49491&format=png&color=000000'; // URL del logo
    doc.addImage(logoUrl, 'PNG', 10, 10, 30, 30); // Ajusta la posición y tamaño del logo

    // Título del reporte
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Reporte de Inventario', 60, 20); // Centrado

    let yOffset = 45; // Desplazamiento en el eje Y para los siguientes elementos

    // Verifica si almacen tiene la estructura esperada
    if (almacen && almacen.medicamentos && Array.isArray(almacen.medicamentos.medicamentos.medicamentos)) {
      // Datos del almacén
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text(`Almacén: ${almacen.nombre}`, 20, yOffset);
      yOffset += 10;

      doc.setFontSize(12);
      doc.text(`Dirección: ${almacen.direccion}`, 20, yOffset);
      yOffset += 10;

      // Línea de separación
      doc.setLineWidth(0.5);
      doc.line(20, yOffset, 190, yOffset); // Dibuja una línea horizontal
      yOffset += 5;

      // Medicamentos
      const medicamentos = almacen.medicamentos.medicamentos.medicamentos;
      if (medicamentos.length > 0) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Medicamentos:', 20, yOffset);
        yOffset += 10;

        // Listado de medicamentos
        medicamentos.forEach((medicamento: { nombreMedicamento: any; stock: any; }) => {
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          doc.text(`${medicamento.nombreMedicamento}: ${medicamento.stock} unidades`, 20, yOffset);
          yOffset += 8;
        });
      } else {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'italic');
        doc.text('No hay medicamentos disponibles en este almacén.', 20, yOffset);
        yOffset += 10;
      }

      // Línea de separación
      doc.setLineWidth(0.5);
      doc.line(20, yOffset, 190, yOffset); // Dibuja una línea horizontal
      yOffset += 5;

      // Añadir espacio entre almacenes
      yOffset += 10;

      // Añadir fecha del reporte
      const fecha = new Date();
      const fechaFormateada = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Fecha del reporte: ${fechaFormateada}`, 20, yOffset);
      yOffset += 10;

      // Descargar el PDF
      doc.save('reporte_inventario.pdf');
    } else {
      console.error('La estructura de los medicamentos es incorrecta.');
    }
  }


}
