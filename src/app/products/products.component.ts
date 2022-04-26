import {Component, OnInit, Sanitizer} from '@angular/core';
import {GreengrocerApiClientService} from "../../services/greengrocer-api-client.service";
import {AppComponent} from "../app.component";
import {TokenStorageService} from "../../services/token-storage.service";
import { DomSanitizer } from '@angular/platform-browser';
import {sanitizeIdentifier} from "@angular/compiler";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  categoryFilter: string = "";
  productsList: any;
  categoriesList: any;
  /*shoppingCart = new Map<string, number>();
  shoppingKeys: any;
  amount: number | undefined = 1;
  sumCart: any = 0.00;
  countCart: any = 0;*/
  newOrder: any = {};
  appComponent:AppComponent;

  // @ts-ignore
  constructor(private apiClientService: GreengrocerApiClientService, appComponent:AppComponent, private tokenStorage: TokenStorageService, public sanitizer:DomSanitizer) {
    this.appComponent = appComponent;
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.getListOfAllProducts();
      this.getListOfCategories();
      this.appComponent.sumCart.toFixed(2);
    }else{
      window.location.replace('');
    }
  }

  getListOfAllProducts(): void {
    this.apiClientService.getAllProducts().subscribe(productsList => {
      productsList.forEach((value: any, sani: Sanitizer) => {
        value.imgFileSrc = '.\\assets' + value.imgFileSrc.split('assets')[1];
        console.log(value.imgFileSrc);
      });
      this.productsList = productsList;
      console.log(this.productsList[0].imgFileSrc);
    });
  }

  getListOfCategories(): void {
    this.apiClientService.getAllCategories().subscribe(categoriesList => {
      this.categoriesList = categoriesList;
    })
  }

  addProductToShoppingCart(id: string): void {
    if (this.appComponent.shoppingCart.has(id)) {
      this.appComponent.amount = this.appComponent.shoppingCart.get(id);
      if (this.appComponent.amount != null) {
        this.appComponent.shoppingCart.set(id, this.appComponent.amount + 1);
      }
    } else {
      this.appComponent.shoppingCart.set(id, 1);
    }
    this.appComponent.countCart += 1;
    // @ts-ignore
    this.appComponent.sumCart = +(this.appComponent.sumCart + this.findProduct(id).price).toFixed(12);
    //this.findProduct(id).price * this.amount;
    document.querySelector("#cart-button")!.textContent = "Koszyk (" + this.appComponent.countCart + ")";
    document.querySelector("#new-order-button")!.removeAttribute("disabled");
    document.querySelector("#new-order-warnings")!.removeAttribute("disabled");
    this.appComponent.shoppingKeys = this.appComponent.shoppingCart.keys();
  }

  deleteProductFromShoppingCart(id: string): void {
    if (this.appComponent.shoppingCart.has(id)) {
      this.appComponent.amount = this.appComponent.shoppingCart.get(id);
      // @ts-ignore
      if (this.appComponent.amount > 1) {
        // @ts-ignore
        this.appComponent.shoppingCart!.set(id, this.appComponent.amount - 1);
      } else {
        this.appComponent.shoppingCart.delete(id);
      }
    }
    this.appComponent.countCart -= 1;

    if (this.appComponent.countCart === 0) {
      document.querySelector("#new-order-button")!.setAttribute("disabled", "disabled");
      document.querySelector("#new-order-warnings")!.setAttribute("disabled", "disabled");
    }

    // @ts-ignore
    document.getElementById("cart-button").textContent = "Koszyk (" + this.countCart + ")";
    // @ts-ignore
    this.appComponent.sumCart = +(this.appComponent.sumCart - this.findProduct(id).price).toFixed(12);
    this.appComponent.shoppingKeys = this.appComponent.shoppingCart.keys();
  }

  findProduct(id: string): any {
    return this.productsList.find(((p: { productId: string; }) => p.productId == id));
  }

  addOrder(): void {
    this.newOrder.payment = {"name": "przy odbiorze"};
    this.newOrder.products = new Array(this.appComponent.shoppingCart.size);
    let l: number = 0;
    // @ts-ignore
    this.appComponent.shoppingCart.forEach((id: string, amount: number) => {
      this.newOrder.products[l] = {"id": amount, "amount": id};
      l = l + 1;
    });

    document.querySelector("#new-order-button")!.setAttribute("disabled", "disabled");
    document.querySelector("#new-order-warnings")!.setAttribute("disabled", "disabled");
    this.appComponent.shoppingCart.clear();
    this.appComponent.sumCart = 0;
    this.appComponent.shoppingKeys.clear;
    this.appComponent.sumCart = 0.00;
    this.appComponent.countCart = 0;
    console.log(this.newOrder);
    this.apiClientService.postNewOrder(this.newOrder).subscribe(order => {
      //console.log(order);
    })
    this.newOrder.clear;

  }

}
