import { Injectable } from '@angular/core';
import { Credential } from '../domain/credential';
import { environment } from '../../environments/environment.development';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';
import { CreateUser } from '../domain/create-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(credential: Credential): Promise<boolean> {
    return new Promise(resolve => {
      let poolData = {
        UserPoolId: environment.userPoolId,
        ClientId: environment.clientId
      };

      let userPool = new CognitoUserPool(poolData);

      let userData = {
        Username: credential.email,
        Pool: userPool,
      };

      let cognitoUser = new CognitoUser(userData);

      let authenticationData = {
        Username: credential.email,
        Password: credential.password,
      };

      let authenticationDetails = new AuthenticationDetails(authenticationData);

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          resolve(true);
        },
        onFailure: err => {
          console.error(err);
          resolve(false);
        }
      });
    });
  }

  register(user: CreateUser): Promise<boolean> {
    return new Promise(resolve => {
      let poolData = {
        UserPoolId: environment.userPoolId,
        ClientId: environment.clientId
      };

      let userPool = new CognitoUserPool(poolData);

      let attributes = [];

      let dataEmail = {
        Name: 'email',
        Value: user.email,
      };

      let dataName = {
        Name: 'custom:name',
        Value: user.name,
      };

      let dataLastNames = {
        Name: 'custom:lastNames',
        Value: user.lastNames,
      };

      let dataDni = {
        Name: 'custom:dni',
        Value: user.dni,
      };

      let dataCuil = {
        Name: 'custom:cuil',
        Value: user.cuil,
      };

      let attributeEmail = new CognitoUserAttribute(dataEmail);
      let attributeName = new CognitoUserAttribute(dataName);
      let attributeLastNames = new CognitoUserAttribute(dataLastNames);
      let attributeDni = new CognitoUserAttribute(dataDni);
      let attributeCuil = new CognitoUserAttribute(dataCuil);

      attributes.push(attributeEmail);
      attributes.push(attributeName);
      attributes.push(attributeLastNames);
      attributes.push(attributeDni);
      attributes.push(attributeCuil);

      userPool.signUp(
        user.email,
        user.password,
        attributes,
        [],
        (err, result) => {
          if (err) {
            resolve(false);
          }
          resolve(true);
        }
      );
    });
  }

  logout(): void {
    let poolData = {
      UserPoolId: environment.userPoolId,
      ClientId: environment.clientId
    };

    let userPool = new CognitoUserPool(poolData);
    let currentUser = userPool.getCurrentUser();
    currentUser?.signOut();
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    let isAuth: boolean = false;

    let poolData = {
      UserPoolId: environment.userPoolId,
      ClientId: environment.clientId
    };

    let userPool = new CognitoUserPool(poolData);

    let currentUser = userPool.getCurrentUser();

    if (currentUser != null) {
      currentUser.getSession((error: any, session: CognitoUserSession) => {
        if (error) {
          console.error(JSON.stringify(error));
        }

        isAuth = session.isValid();
      });
    }

    return isAuth;
  }

  getToken(): string {
    for (let index = 0; index < localStorage.length; index++) {
      if (localStorage.key(index)?.endsWith('accessToken') && localStorage.key(index)?.includes(environment.clientId)) {

        let item = localStorage.getItem(localStorage.key(index) || '');

        if (item != null) {

          return item;
        }
      }
    }

    return '';
  }
}