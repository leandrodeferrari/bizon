import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { CreateUser } from '../domain/create-user';
import { User } from '../domain/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http: HttpClient = inject(HttpClient);
  private url = `${environment.rootUrl}/usuarios`

  constructor() { }

  save(createUser: CreateUser): Observable<any> {
    const user = {
      nombre: createUser.name,
      apellido: createUser.lastNames,
      dni: createUser.dni,
      cuil: createUser.cuil,
      email: createUser.email,
      contrasenia: createUser.password
    }
    return this.http.post<any>(`${this.url}/crear-usuario`, user).pipe(
      map(response => {
        const usuario = response.usuario;
        return usuario;
      })
    );
  }

  login(email: string, contrasenia: string): Observable<User> {
    return this.http.post<any>(`${this.url}/login`, { email: email, contrasenia: contrasenia }).pipe(
      map(response => {
        const usuario = response.usuario;
        return usuario;
      })
    );
  }
}
