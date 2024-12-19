import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Laboratorio } from '../models/laboratorio';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {

  private laboratorios: Laboratorio[] = [];

  private url: string = 'http://localhost:8080/api/laboratorios' ;



  constructor(private http: HttpClient) { }

  findAll(): Observable<Laboratorio[]> {
    return this.http.get<Laboratorio[]>(this.url);
  }

  findAllPageable(page: number): Observable<any> {
    return this.http.get<any[]>(`${this.url}/page/${page}`);
  }

  findById(id: number): Observable<Laboratorio> {
    return this.http.get<Laboratorio>(`${this.url}/${id}`);
  }

  create(laboratorio: Laboratorio): Observable<Laboratorio>{
    return this.http.post<Laboratorio>(this.url, laboratorio);
  }

  update(laboratorio: Laboratorio): Observable<Laboratorio>{
    return this.http.put<Laboratorio>(`${this.url}/${laboratorio.id}`, laboratorio);
  }

  remove(id: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`);
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