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
    localStorage.clear();
    window.location.replace('');
  }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public saveUser(username: string): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, username);
  }

  public saveUserType(userType: string): void {
    localStorage.removeItem(USER_TYPE);
    localStorage.setItem(USER_TYPE, userType);
  }

  public saveUserID(id: string): void {
    localStorage.removeItem(USER_ID);
    localStorage.setItem(USER_ID, id);
  }

  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return user;
    }
    return {};
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public getUserId(): string | null {
    return localStorage.getItem(USER_ID);
  }

  public getUserType(): string | null {
    return localStorage.getItem(USER_TYPE);
  }
}
