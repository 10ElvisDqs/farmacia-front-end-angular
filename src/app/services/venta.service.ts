import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private ventas: Venta[] = [];

  private url: string = 'http://localhost:8080/api/ventas';
  private apiUrl = 'http://localhost:8080/api/ventas/usuario/ventas';

  constructor(private http: HttpClient) { }


    findAll(): Observable<any[]> {
      return this.http.get<any[]>(this.url);
    }

    findAllPageable(page: number): Observable<any> {
      return this.http.get<any[]>(`${this.url}/page/${page}`);
    }

    findById(id: number): Observable<Venta> {
      return this.http.get<Venta>(`${this.url}/${id}`);
    }

    create(venta: any): Observable<any>{
      return this.http.post<any>(this.url, venta);
    }

    update(venta: Venta): Observable<Venta>{
      return this.http.put<Venta>(`${this.url}/${venta.id}`, venta);
    }

    remove(id: number): Observable<void>{
      return this.http.delete<void>(`${this.url}/${id}`);
    }

    obtenerVentas(data: { usuarioId: number; fecha: string }): Observable<any> {
      return this.http.post(this.apiUrl, data);
    }

    obtenerVentasPorRango(usuarioId: number, fechaInicio: string, fechaFin: string): Observable<any> {
      const url = `${this.url}/usuario/ventas/rango`;
      const body = {
        usuarioId,
        fechaInicio,
        fechaFin,
      };
      return this.http.post(url, body);
    }

   }



