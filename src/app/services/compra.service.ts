import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Almacen } from '../models/almacen';
import { Compra } from '../models/compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private compras: Compra[] = [];

  private url: string = 'http://localhost:8080/api/compras';


  constructor(private http: HttpClient) { }

    
    findAll(): Observable<any[]> {
      return this.http.get<any[]>(this.url);
    }
  
    findAllPageable(page: number): Observable<any> {
      return this.http.get<any[]>(`${this.url}/page/${page}`);
    }
  
    findById(id: number): Observable<Compra> {
      return this.http.get<Compra>(`${this.url}/${id}`);
    }
  
    create(compra: any): Observable<any>{
      return this.http.post<any>(this.url, compra);
    }
   
  
    update(compra: Compra): Observable<Compra>{
      return this.http.put<Compra>(`${this.url}/${compra.id}`, compra);
    }
  
    remove(id: number): Observable<void>{
      return this.http.delete<void>(`${this.url}/${id}`);
    }

   }



