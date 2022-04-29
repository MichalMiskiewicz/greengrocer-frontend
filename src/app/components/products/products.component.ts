import {Component, OnInit} from '@angular/core';
import {GreengrocerApiClientService} from "../../../services/greengrocer-api-client.service";
import {AppComponent} from "../../app.component";
import {TokenStorageService} from "../../../services/token-storage.service";
import {DomSanitizer} from '@angular/platform-browser';
import {document} from "ngx-bootstrap/utils";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  categoryFilter: string = "";
  productsList: any;
  categoriesList: any;
  show: boolean = true;
  newOrder: any = {};
  appComponent: AppComponent;

  // @ts-ignore
  constructor(private apiClientService: GreengrocerApiClientService,
              appComponent: AppComponent, private tokenStorage: TokenStorageService, public sanitizer: DomSanitizer) {
    this.appComponent = appComponent;
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.getListOfAllProducts();
      this.getListOfCategories();
      this.appComponent.shoppingCartActive = true;
      this.appComponent.sumCart.toFixed(2);
      document.querySelectorAll(".nav-item > a")!.item(0)!.className = "nav-link text-light active";
      document.querySelectorAll(".nav-item > a")!.item(0)!.setAttribute("style", "border-bottom: none !important; color: rgb(204,202,5) !important;");
      document.querySelectorAll(".nav-item > a")!.item(0)!.parentElement!.setAttribute("style", "border-bottom: none !important;");
    } else {
      window.location.replace('');
    }
  }


  getListOfAllProducts(): void {
    this.apiClientService.getAllProducts().subscribe(productsList => {
      productsList.forEach((value: any) => {
        value.imgFileSrc = '.\\assets' + value.imgFileSrc.split('assets')[1];
      });
      this.productsList = productsList;
    });
  }

  getListOfCategories(): void {
    this.apiClientService.getAllCategories().subscribe(categoriesList => {
      this.categoriesList = categoriesList;
    })
  }

  addProductToShoppingCart(button: any): void {
    let id = button.parentElement.id;
    this.productsList.forEach((value: any) => {
      if (value.productId === id) {
        if (value.amount >= 1) {
          value.amount = value.amount - 1;
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
          this.appComponent.sumCart = +(this.appComponent.sumCart + this.findProduct(id).price).toFixed(2);
          document.querySelector("#cart-button")!.textContent = "Koszyk (" + this.appComponent.countCart + ")";
          document.querySelector("#new-order-button")!.removeAttribute("disabled");
          document.querySelector("#new-order-warnings")!.removeAttribute("disabled");
          this.appComponent.shoppingKeys = this.appComponent.shoppingCart.keys();
        }
        if (value.amount == 0) {
          button.setAttribute("disabled", "disabled");
        }
      }
    });
  }

  deleteProductFromShoppingCart(button: any): void {
    let id = button.parentElement.id;
    this.productsList.forEach((value: any) => {
      if (value.productId === id) {
        value.amount = value.amount + 1;
        document.getElementById("add-product-button" + value.productId)!.removeAttribute("disabled");
      }
    });
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
    document.getElementById("cart-button").textContent = "Koszyk (" + this.appComponent.countCart + ")";
    // @ts-ignore
    this.appComponent.sumCart = +(this.appComponent.sumCart - this.findProduct(id).price).toFixed(2);
    this.appComponent.shoppingKeys = this.appComponent.shoppingCart.keys();
  }

  findProduct(id: string): any {
    return this.productsList.find(((p: { productId: string; }) => p.productId == id));
  }

  updateAmount(item: any): void {
    let productId = item.parentElement.id;
    let productAmount = item.children[0].value;
    this.apiClientService.setProductAmount(productId, productAmount).subscribe(product => {
      window.location.reload();
    },error => {
      alert("Nie udało się zaktualizować ilości produktu!");
    });
  }

  addOrder(): void {
    let warningsInput = document.getElementById("new-order-warnings");
    this.newOrder.warnings = warningsInput.value;
    this.newOrder.payment = {"name": "gotówka"};
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
    document.getElementById("cart-button").textContent = "Koszyk (" + this.appComponent.countCart + ")";
    warningsInput.value = "";
    //console.log(this.newOrder);
    this.apiClientService.postNewOrder(this.newOrder).subscribe(order => {
      //console.log(order);
    })
    this.newOrder.clear;
    //window.location.reload();

  }

}
