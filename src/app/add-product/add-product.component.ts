import { Component, OnInit } from '@angular/core';
import {GreengrocerApiClientService} from "../../services/greengrocer-api-client.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public newProduct: any = {};

  constructor(private apiClientService: GreengrocerApiClientService) { }

  ngOnInit(): void {
  }

  addProduct():void {
    console.log(this.newProduct);
    this.apiClientService.postNewProduct(this.newProduct).subscribe(product => {
      console.log(product);
    });
  }

}
