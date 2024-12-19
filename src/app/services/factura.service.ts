import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura';
import { Medicamento } from '../models/medicamento';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private urlEndPoint: string = 'http://localhost:8080/api/facturas';

  constructor(private http: HttpClient) { }

  getFactura(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.urlEndPoint}/${id}`);
  }

   
  findAll(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.urlEndPoint);
  }

  findAllPageable(page: number): Observable<any> {
    return this.http.get<any[]>(`${this.urlEndPoint}/page/${page}`);
  }

  findById(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.urlEndPoint}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }

  filtrarProductos(term: string): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(`${this.urlEndPoint}/filtrar-productos/${term}`);
  }

  create(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(this.urlEndPoint, factura);
  }

 
  update(factura: Factura): Observable<Factura>{
    return this.http.put<Factura>(`${this.urlEndPoint}/${factura.id}`, factura);
  }
}
