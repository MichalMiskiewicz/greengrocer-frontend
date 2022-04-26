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
  shoppingCart = new Map<string, number>();
  shoppingKeys: any;
  amount: number | undefined = 1;
  sumCart: any = 0.00;
  countCart: any = 0;
  newOrder: any = {};
  appComponent:AppComponent;

  // @ts-ignore
  constructor(private apiClientService: GreengrocerApiClientService, appComponent:AppComponent, private tokenStorage: TokenStorageService, public sanitizer:DomSanitizer) {
    this.appComponent = appComponent;
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.getListOfProducts();
      this.getListOfCategories();
      this.sumCart.toFixed(2);
    }else{
      window.location.replace('');
    }
  }

  getListOfProducts(): void {
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
    if (this.shoppingCart.has(id)) {
      this.amount = this.shoppingCart.get(id);
      if (this.amount != null) {
        this.shoppingCart.set(id, this.amount + 1);
      }
    } else {
      this.shoppingCart.set(id, 1);
    }
    this.countCart += 1;
    // @ts-ignore
    this.sumCart = +(this.sumCart + this.findProduct(id).price).toFixed(12);
    //this.findProduct(id).price * this.amount;
    document.querySelector("#cart-button")!.textContent = "Koszyk (" + this.countCart + ")";
    document.querySelector("#new-order-button")!.removeAttribute("disabled");
    document.querySelector("#new-order-warnings")!.removeAttribute("disabled");
    this.shoppingKeys = this.shoppingCart.keys();
  }

  deleteProductFromShoppingCart(id: string): void {
    if (this.shoppingCart.has(id)) {
      this.amount = this.shoppingCart.get(id);
      // @ts-ignore
      if (this.amount > 1) {
        // @ts-ignore
        this.shoppingCart!.set(id, this.amount - 1);
      } else {
        this.shoppingCart.delete(id);
      }
    }
    this.countCart -= 1;

    if (this.countCart === 0) {
      document.querySelector("#new-order-button")!.setAttribute("disabled", "disabled");
      document.querySelector("#new-order-warnings")!.setAttribute("disabled", "disabled");
    }

    // @ts-ignore
    document.getElementById("cart-button").textContent = "Koszyk (" + this.countCart + ")";
    // @ts-ignore
    this.sumCart = +(this.sumCart - this.findProduct(id).price).toFixed(12);
    this.shoppingKeys = this.shoppingCart.keys();
  }

  findProduct(id: string): any {
    return this.productsList.find(((p: { productId: string; }) => p.productId == id));
  }

  addOrder(): void {
    //console.log(this.countCart);
    // console.log(this.newOrder);

    //console.log(this.shoppingCart);
    //console.log(this.shoppingCart.keys().next().value);
    //console.log(this.shoppingCart.keys().next().value);


    this.newOrder.payment = {"name": "przy odbiorze"};

    this.newOrder.products = new Array(this.shoppingCart.size);
    let l: number = 0;
    // @ts-ignore
    this.shoppingCart.forEach((id: string, amount: number) => {
      this.newOrder.products[l] = {"id": amount, "amount": id};
      l = l + 1;
    });


    //console.log(JSON.stringify(this.newOrder));

    document.querySelector("#new-order-button")!.setAttribute("disabled", "disabled");
    document.querySelector("#new-order-warnings")!.setAttribute("disabled", "disabled");
    //document.getElementById("new-order-warnings")!.val(' ');


    //console.log(this.newOrder);
    this.shoppingCart.clear();
    this.sumCart = 0;
    this.shoppingKeys.clear;
    this.sumCart = 0.00;
    this.countCart = 0;
    this.newOrder.clear;
    this.apiClientService.postNewOrder(this.newOrder).subscribe(order => {
      //console.log(order);
    })

  }

}
