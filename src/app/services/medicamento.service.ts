import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
// import { Medicamento } from '../models/medicamento';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  private medicamentos: any[] = [];

  private url: string = 'http://localhost:8080/api/medicamentos';


  constructor(private http: HttpClient) { }


    findAll(): Observable<any[]> {
      return this.http.get<any[]>(this.url);
    }

    findAllPageable(page: number): Observable<any> {
      return this.http.get<any[]>(`${this.url}/page/${page}`);
    }

    findById(id: number): Observable<any> {
      return this.http.get<any>(`${this.url}/${id}`);
    }

    create(medicamento: any): Observable<any>{
      return this.http.post<any>(this.url, medicamento);
    }

     update( medicamento: any): Observable<any>{
      return this.http.put<any>(`${this.url}/${medicamento.id}`, medicamento);
    }

   

    remove(id: number): Observable<void>{
      return this.http.delete<void>(`${this.url}/${id}`);
    }

    getLaboratorios():Observable<any>{
      return this.http.get<any>('http://localhost:8080/api/laboratorios');
    }
   }



