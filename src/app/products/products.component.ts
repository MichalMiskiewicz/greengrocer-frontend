import {Component, OnInit} from '@angular/core';
import {GreengrocerApiClientService} from "../../services/greengrocer-api-client.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  categoryFilter: string = "";
  productsList: any = {};
  categoriesList: any = {};
  shoppingCart = new Map<string, number>();
  shoppingKeys: any = {};
  amount: number | undefined = 1;
  sumCart: any = 0.00;
  countCart: any = 0;

  constructor(private apiClientService: GreengrocerApiClientService) {
  }

  ngOnInit(): void {
    this.getListOfProducts();
    this.getListOfCategories();
    this.sumCart.toFixed(2);
  }

  getListOfProducts(): void {
    this.apiClientService.getAllProducts().subscribe(productsList => {
      this.productsList = productsList;
    })
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
    // @ts-ignore
    document.getElementById("cart-button").textContent = "Koszyk (" + this.countCart + ")";

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
    // @ts-ignore
    document.getElementById("cart-button").textContent = "Koszyk (" + this.countCart + ")";
    // @ts-ignore
    this.sumCart = +(this.sumCart - this.findProduct(id).price).toFixed(12);
    this.shoppingKeys = this.shoppingCart.keys();
  }

  findProduct(id: string): any {
    return this.productsList.find(((p: { productId: string; }) => p.productId == id));
  }

}
