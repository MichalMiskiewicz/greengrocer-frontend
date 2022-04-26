import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {NewProductDTO} from "../dto/NewProductDTO";
import {NewOrderDTO} from "../dto/NewOrderDTO";
import {NewUserDTO} from "../dto/NewUserDTO";
import {TokenStorageService} from "./token-storage.service";

const API_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class GreengrocerApiClientService {

  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ` + this.tokenStorageService.getToken()
    })
  };

  constructor(private httpClient: HttpClient, private tokenStorageService: TokenStorageService) {
  }

  getAllOrders(): Observable<any> {
    return this.httpClient.get(API_URL + 'orders/all', this.httpOptions
    );
  }

  getAllDrivers(): Observable<any> {
    return this.httpClient.get(API_URL + 'users/drivers/all', this.httpOptions
    );
  }

  getAllProducts(): Observable<any> {
    return this.httpClient.get(API_URL + 'products/all', this.httpOptions
    );
  }

  getAllCategories(): Observable<any> {
    console.log(this.tokenStorageService.getToken());
    return this.httpClient.get(API_URL + 'products/categories/all', this.httpOptions
    );
  }

  setDriverInTheOrder(orderId: string, driverId: string): Observable<any> {
    console.log(this.tokenStorageService.getToken());
    return this.httpClient.patch(API_URL + 'orders/' + orderId + '/driver-set/' + driverId, {}, this.httpOptions
    );
  }

  setStatusInTheOrder(orderId: string, status: any): Observable<any> {
    return this.httpClient.patch(API_URL + 'orders/' + orderId + '/status-change', status, this.httpOptions
    );
  }

  postNewProduct(newProduct: NewProductDTO): Observable<any> {
    return this.httpClient.post(API_URL + 'products/add', newProduct, this.httpOptions
    );
  }

  postNewOrder(newOrder: NewOrderDTO): Observable<any> {
    return this.httpClient.post(API_URL + 'orders/add/f2a7c117-c1ab-11ec-9257-0242ac110002', newOrder, this.httpOptions
    );
  }

  postNewUser(newUser: NewUserDTO): Observable<any> {
    return this.httpClient.post(API_URL + 'users/add', newUser, {
        responseType: 'json',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }
    );
  }

  postImage(img: File): Observable<any> {
    console.log(img);
    let formData: any = new FormData();
    formData.append('file', img);
    return this.httpClient.post(API_URL + 'products/upload', formData, {
        responseType: 'text' as 'json',
        headers: new HttpHeaders({
          'Authorization': `Bearer ` + this.tokenStorageService.getToken()
        })
      }
    );
  }


}
