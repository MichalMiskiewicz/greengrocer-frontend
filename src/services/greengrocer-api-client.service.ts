import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class GreengrocerApiClientService {
  constructor(private httpClient: HttpClient) {}

  getAllOrders(): Observable<any> {
    return this.httpClient.get(API_URL + 'orders/all', {responseType: 'json',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    })}
    );
  }

  getAllDrivers(): Observable<any> {
    return this.httpClient.get(API_URL + 'users/drivers/all', {responseType: 'json',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      })}
    );
  }

  setDriverInTheOrder(orderId:string, driverId: string): Observable<any>{

    console.log("wejszlo"+'orders/'+orderId+'/driver-set/'+driverId);
    return this.httpClient.patch(API_URL + 'orders/'+orderId+'/driver-set/'+driverId, {responseType: 'json',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH'
      })}
    );
  }
}
