import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

import { DetalleVenta } from '../models/detalleventa';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {

  private detalleventas: DetalleVenta[] = [];

  private url: string = 'http://localhost:8080/api/detallesventas';


  constructor(private http: HttpClient) { }

    
    findAll(): Observable<DetalleVenta[]> {
      return this.http.get<DetalleVenta[]>(this.url);
    }
  
    findAllPageable(page: number): Observable<any> {
      return this.http.get<any[]>(`${this.url}/page/${page}`);
    }
  
    findById(id: number): Observable<DetalleVenta> {
      return this.http.get<DetalleVenta>(`${this.url}/${id}`);
    }
  
    create(detalleventa: DetalleVenta): Observable<DetalleVenta>{
      return this.http.post<DetalleVenta>(this.url, detalleventa);
    }
  
   // update(detalleventa: DetalleVenta): Observable<DetalleVenta>{
     // return this.http.put<DetalleVenta>(`${this.url}/${detalleventa.id}`, detalleventa);
    ///}
  
    remove(id: number): Observable<void>{
      return this.http.delete<void>(`${this.url}/${id}`);
    }

   }



