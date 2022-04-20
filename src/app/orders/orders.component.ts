import { Component, OnInit } from '@angular/core';
import {GreengrocerApiClientService} from "../../services/greengrocer-api-client.service";
import {toNumber} from "ngx-bootstrap/timepicker/timepicker.utils";
import {Router} from "@angular/router";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  ordersList: any = {};
  driversList: any = {};

  constructor(private apiClientService: GreengrocerApiClientService, private router: Router) { }

  ngOnInit(): void {
    this.getListOfOrders();
    this.getListOfDrivers();
  }

  getListOfOrders():void {
    this.apiClientService.getAllOrders().subscribe(ordersList => {
      this.ordersList = ordersList;
      console.log(ordersList);
    })
  }

  getListOfDrivers():void {
    this.apiClientService.getAllDrivers().subscribe(driversList => {
      this.driversList = driversList;
      console.log(driversList);
    })
  }

  setDriver(id: string):void {
    let idAll = id.split('|');
    console.log(idAll[0]);
    this.apiClientService.setDriverInTheOrder(idAll[0], idAll[1]).subscribe(did =>{
      this.ngOnInit();
    });
  }
}
