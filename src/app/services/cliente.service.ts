import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientes: Cliente[] = [];

  private url: string = 'http://localhost:8080/api/clientes';


  constructor(private http: HttpClient) { }

    
    findAll(): Observable<Cliente[]> {
      return this.http.get<Cliente[]>(this.url);
    }
  
    findAllPageable(page: number): Observable<any> {
      return this.http.get<any[]>(`${this.url}/page/${page}`);
    }
  
    findById(id: number): Observable<Cliente> {
      return this.http.get<Cliente>(`${this.url}/${id}`);
    }
  
    create(cliente: Cliente): Observable<Cliente>{
      return this.http.post<Cliente>(this.url, cliente);
    }
  
    update(cliente: Cliente): Observable<Cliente>{
      return this.http.put<Cliente>(`${this.url}/${cliente.id}`, cliente);
    }
  
    remove(id: number): Observable<void>{
      return this.http.delete<void>(`${this.url}/${id}`);
    }

   }



