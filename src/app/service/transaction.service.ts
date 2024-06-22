import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { User } from '../domain/user';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private http: HttpClient = inject(HttpClient);
  private url: string = `${environment.rootUrl}/transacciones`;

  constructor() { }

  findAllByUserId(): Observable<any[]> {
    let currentUser: User = JSON.parse(localStorage.getItem('user') || '');
    let id = currentUser.id;

    return this.http.get<any>(`${this.url}/listar-transacciones/${id}`).pipe(
      map(response => {
        const transactions: any[] = response.transacciones;
        return transactions;
      })
    );
  }
}
