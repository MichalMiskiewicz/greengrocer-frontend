import {Component, OnInit} from '@angular/core';
import {GreengrocerApiClientService} from "../../services/greengrocer-api-client.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  ordersList: any = {};
  driversList: any = {};
  orderSum: number = 0;
  orderSumList: any = {};

  constructor(private apiClientService: GreengrocerApiClientService) {
  }

  ngOnInit(): void {
    this.getListOfOrders();
    this.getListOfDrivers();
  }

  getListOfOrders(): void {
    this.apiClientService.getAllOrders().subscribe(ordersList => {
      this.ordersList = ordersList;

      let l: number = 0;
      this.orderSumList = new Array(this.ordersList.size);

      ordersList.forEach((o: any) => {
        this.orderSum = 0.0;
        o.products.forEach((p: any) => {
          this.orderSumList[l] = this.orderSum = +(this.orderSum + (p.amount * p.product.price)).toFixed(12);
        });
        l = l + 1;
      });
    })
  }

  getListOfDrivers(): void {
    this.apiClientService.getAllDrivers().subscribe(driversList => {
      this.driversList = driversList;
      console.log(driversList);
    })
  }

  setDriver(id: string): void {
    let idAll = id.split('|');
    console.log(idAll[0]);
    this.apiClientService.setDriverInTheOrder(idAll[0], idAll[1]).subscribe(did => {
      this.ngOnInit();
    });
  }
}
