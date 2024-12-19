import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Laboratorio } from '../models/laboratorio';





interface FechaRequest {
  fecha: string;
}

interface RangoFechasDto {
  fechaInicio: string; // formato "yyyy-MM-dd"
  fechaFin: string;    // formato "yyyy-MM-dd"
}
@Injectable({
  providedIn: 'root'
})
export class ReporteService {


  

  //private laboratorios: Laboratorio[] = [];

  private baseUrl: string = 'http://localhost:8080/api/dashboard' ;



  constructor(private http: HttpClient) { }


  // Obtener stock total
  getTotalStock(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total-stock`);
  }

  // Obtener stock por almacen
  getStockByAlmacen(almacenId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/stock-por-almacen/${almacenId}`);
  }

  // Obtener ventas diarias
  getVentasDiarias(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/ventas-diarias`);
  }

  // Obtener ventas semanales
  getVentasSemanales(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/ventas-semanales`);
  }

  // Obtener ventas mensuales
  getVentasMensuales(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/ventas-mensuales`);
  }

  // Obtener ventas específicas por fecha
  getVentaEspecifica(fechaRequest: FechaRequest): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/ventas-especifica`, fechaRequest);
  }

  // Obtener top medicamentos vendidos en la semana
  getTopMedicamentosVendidosSemana(rangoFechas: RangoFechasDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/medicamentos-mas-vendidos-semana`, rangoFechas);
  }
}








/* 
  private url: string = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  create(user: User): Observable<User>{
    return this.http.post<User>(this.url, user);
  }

  update(user: User): Observable<User>{
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }

  remove(id: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
 */