import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDetailsDTO} from "../dto/UserDetailsDTO";

const AUTH_API = 'http://localhost:8080/authenticate';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  login(userDetails: UserDetailsDTO): Observable<any> {
    return this.httpClient.post(AUTH_API, userDetails, {
      responseType: 'json',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  };

  register(username: string, email: string, password: string): Observable<any> {
    return this.httpClient.post(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }
}
