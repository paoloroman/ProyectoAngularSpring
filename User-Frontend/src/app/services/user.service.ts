//Paolo Román
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];

  private urlBackend: string = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  findAll(): Observable<User[]> { // tenemos que devolver un observable con el metodo get de http lo que hacemos es cpnseguir los datos del backend 
    return this.http.get<User[]>(this.urlBackend);
  }

  findAllPageable(page : number): Observable<any> {  
    return this.http.get<any>(`${this.urlBackend}/page/${page}`); 
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(`${this.urlBackend}/${id}`); // `` usamos Backticks en vez de concatrenar con + +
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.urlBackend, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.urlBackend}/${user.id}`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBackend}/${id}`)
  }
}


