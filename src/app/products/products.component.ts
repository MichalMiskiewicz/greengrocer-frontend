import { Component, OnInit } from '@angular/core';
import {GreengrocerApiClientService} from "../../services/greengrocer-api-client.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  ordersList: any ={};

  constructor(private apiClientService: GreengrocerApiClientService) { }

  ngOnInit(): void {
    this.getListOfOrders();
  }

  getListOfOrders():void {
    this.apiClientService.getAllOrders().subscribe(ordersList => {
      this.ordersList = ordersList;
      console.log(ordersList);
    })
  }

}
