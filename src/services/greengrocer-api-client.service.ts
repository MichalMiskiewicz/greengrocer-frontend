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
      'Authorization': `Bearer ` + this.tokenStorage.getToken()
    })
  };

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) {
  }

  getAllOrders(): Observable<any> {
    return this.httpClient.get(API_URL + 'orders/all', this.httpOptions
    );
  }

  getAllClientsOrders(): Observable<any> {
    return this.httpClient.get(API_URL + 'orders/client/' + this.tokenStorage.getUserId() + '/all', this.httpOptions
    );
  }

  getAllDriversOrders(): Observable<any> {
    return this.httpClient.get(API_URL + 'orders/driver/' + this.tokenStorage.getUserId() + '/all', this.httpOptions
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
    return this.httpClient.get(API_URL + 'products/categories/all', this.httpOptions
    );
  }

  getProductsByCategory(categoryId: string): Observable<any> {
    return this.httpClient.get(API_URL + 'products/products-name/' + categoryId, this.httpOptions
    );
  }

  setDriverInTheOrder(orderId: string, driverId: string): Observable<any> {
    return this.httpClient.patch(API_URL + 'orders/' + orderId + '/driver-set/' + driverId, {}, this.httpOptions
    );
  }

  setStatusInTheOrder(orderId: string, status: any): Observable<any> {
    return this.httpClient.patch(API_URL + 'orders/' + orderId + '/status-change', status, this.httpOptions
    );
  }

  setProductAmount(productId: string, productAmount: number): Observable<any> {
    return this.httpClient.patch(API_URL + 'products/amount/' + productId + '/' + productAmount, {}, this.httpOptions
    );
  }

  /*deleteProduct(productId: string): Observable<any> {
    return this.httpClient.patch(API_URL + 'products/delete/' + productId, {}, this.httpOptions
    );
  }*/

  postNewProduct(newProduct: NewProductDTO): Observable<any> {
    return this.httpClient.post(API_URL + 'products/add', newProduct, this.httpOptions
    );
  }

  postNewOrder(newOrder: NewOrderDTO): Observable<any> {
    return this.httpClient.post(API_URL + 'orders/add/' + this.tokenStorage.getUserId(), newOrder, this.httpOptions
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
    let formData: any = new FormData();
    formData.append('file', img);
    return this.httpClient.post(API_URL + 'products/upload', formData, {
        responseType: 'text' as 'json',
        headers: new HttpHeaders({
          'Authorization': `Bearer ` + this.tokenStorage.getToken()
        })
      }
    );
  }


}
