import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, map } from 'rxjs';
import { CreateUser } from '../domain/create-user';

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
    );;
  }
}
