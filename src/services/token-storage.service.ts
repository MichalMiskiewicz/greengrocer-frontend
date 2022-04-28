import {Injectable} from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_TYPE = 'auth-user-type';
const USER_ID = 'auth-user-id';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  signOut(): void {
    window.sessionStorage.clear();
    window.location.replace('');
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveUser(username: string): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, username);
  }

  public saveUserType(userType: string): void {
    window.sessionStorage.removeItem(USER_TYPE);
    window.sessionStorage.setItem(USER_TYPE, userType);
  }

  public saveUserID(id: string): void {
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, id);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return user;
    }
    return {};
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public getUserId(): string | null {
    return window.sessionStorage.getItem(USER_ID);
  }

  public getUserType(): string | null {
    return window.sessionStorage.getItem(USER_TYPE);
  }
}
