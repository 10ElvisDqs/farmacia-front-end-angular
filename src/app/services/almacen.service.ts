import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Almacen } from '../models/almacen';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  private almacenes: Almacen[] = [];

  private url: string = 'http://localhost:8080/api/almacenes';


  constructor(private http: HttpClient) { }


    findAll(): Observable<any[]> {
      return this.http.get<any[]>(this.url);
    }
    obtenerInventario(idAlmacen:number): Observable<any[]> {
      return this.http.get<any[]>(`${this.url}/listar-medicamentos/${idAlmacen}`);
    }

    findAllPageable(page: number): Observable<any> {
      return this.http.get<any[]>(`${this.url}/page/${page}`);
    }

    findById(id: number): Observable<Almacen> {
      return this.http.get<Almacen>(`${this.url}/${id}`);
    }

    create(almacen: Almacen): Observable<Almacen>{
      return this.http.post<Almacen>(this.url, almacen);
    }

    update(almacen: Almacen): Observable<Almacen>{
      return this.http.put<Almacen>(`${this.url}/${almacen.id}`, almacen);
    }

    remove(id: number): Observable<void>{
      return this.http.delete<void>(`${this.url}/${id}`);
    }

   }



