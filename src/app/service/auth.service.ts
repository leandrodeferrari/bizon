import { Injectable } from '@angular/core';
import { Credential } from '../domain/credential';
import { User } from '../domain/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(credential: Credential): Promise<boolean> {
    return new Promise(resolve => {
      // API or Cognito

      setTimeout(() => {
        if (credential.email === 'test@ejemplo.com' && credential.password === '12345678') {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 2000);
    });
  }

  register(user: User): Promise<boolean> {
    return new Promise(resolve => {
      // API or Cognito

      setTimeout(() => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 2000);
    });
  }
}
