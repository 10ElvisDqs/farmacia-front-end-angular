import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private empleados: Empleado[] = [];

  private url: string = 'http://localhost:8080/api/empleados';


  constructor(private http: HttpClient) { }

    
    findAll(): Observable<Empleado[]> {
      return this.http.get<Empleado[]>(this.url);
    }
  
    findAllPageable(page: number): Observable<any> {
      return this.http.get<any[]>(`${this.url}/page/${page}`);
    }
  
    findById(id: number): Observable<Empleado> {
      return this.http.get<Empleado>(`${this.url}/${id}`);
    }
  
    create(empleado: Empleado): Observable<Empleado>{
      return this.http.post<Empleado>(this.url, empleado);
    }
  
    update(empleado: Empleado): Observable<Empleado>{
      return this.http.put<Empleado>(`${this.url}/${empleado.id}`, empleado);
    }
  
    remove(id: number): Observable<void>{
      return this.http.delete<void>(`${this.url}/${id}`);
    }

   }



