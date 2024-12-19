import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private proveedores: Proveedor[] = [];

  private url: string = 'http://localhost:8080/api/proveedores';


  constructor(private http: HttpClient) { }

    
    findAll(): Observable<Proveedor[]> {
      return this.http.get<Proveedor[]>(this.url);
    }
  
    findAllPageable(page: number): Observable<any> {
      return this.http.get<any[]>(`${this.url}/page/${page}`);
    }
  
    findById(id: number): Observable<Proveedor> {
      return this.http.get<Proveedor>(`${this.url}/${id}`);
    }
  
    create(proveedor: Proveedor): Observable<Proveedor>{
      return this.http.post<Proveedor>(this.url, proveedor);
    }
  
    update(proveedor: Proveedor): Observable<Proveedor>{
      return this.http.put<Proveedor>(`${this.url}/${proveedor.id}`, proveedor);
    }
  
    remove(id: number): Observable<void>{
      return this.http.delete<void>(`${this.url}/${id}`);
    }

   }



