import {Component, OnInit} from '@angular/core';
import {GreengrocerApiClientService} from "../../../services/greengrocer-api-client.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  ordersList: any;
  driversList: any;
  orderSum: number = 0;
  orderSumList: any = {};
  appComponent: AppComponent;

  orderStatus: any = {};

  constructor(private apiClientService: GreengrocerApiClientService, appComponent: AppComponent, private tokenStorage: TokenStorageService) {
    this.appComponent = appComponent;
  }

  ngOnInit(): void {
    console.log(this.tokenStorage.getUser());
    this.appComponent.shoppingCartActive = false;
    if (this.tokenStorage.getToken()) {
      switch (this.tokenStorage.getUserType()) {
        case "Admin": {
          document.querySelectorAll(".nav-item > a")!.item(1)!.className = "nav-link text-light active";
          document.querySelectorAll(".nav-item > a")!.item(1)!.setAttribute("style", "border-bottom: none !important; color: rgb(204,202,5) !important;");
          document.querySelectorAll(".nav-item > a")!.item(1)!.parentElement!.setAttribute("style", "border-bottom: none !important;");
          this.getListOfOrders();
          this.getListOfDrivers();
          break;
        }
        case "Klient": {
          document.querySelectorAll(".nav-item > a")!.item(1)!.className = "nav-link text-light active";
          document.querySelectorAll(".nav-item > a")!.item(1)!.setAttribute("style", "border-bottom: none !important; color: rgb(204,202,5) !important;");
          document.querySelectorAll(".nav-item > a")!.item(1)!.parentElement!.setAttribute("style", "border-bottom: none !important;");
          this.getListOfClientsOrders();
          break;
        }
        case "Kierowca": {
          document.querySelectorAll(".nav-item > a")!.item(0)!.className = "nav-link text-light active";
          document.querySelectorAll(".nav-item > a")!.item(0)!.setAttribute("style", "border-bottom: none !important; color: rgb(204,202,5) !important;");
          document.querySelectorAll(".nav-item > a")!.item(0)!.parentElement!.setAttribute("style", "border-bottom: none !important;");
          this.getListOfDriversOrders();
          break;
        }
        default: {
          //statements;
          break;
        }
      }

    } else {
      window.location.replace('');
    }

  }

  createDate(date: string): string {
    let dateSplit = date.split("T");
    let result = dateSplit[0] + " " + dateSplit[1].split(".")[0];
    return result.toString();
  }

  getListOfOrders(): void {
    this.apiClientService.getAllOrders().subscribe(ordersList => {
      this.ordersList = ordersList;

      let l: number = 0;
      this.orderSumList = new Array(this.ordersList.size);

      ordersList.forEach((o: any) => {
        this.orderSum = 0.0;
        o.products.forEach((p: any) => {
          this.orderSumList[l] = this.orderSum = +(this.orderSum + +(p.amount * p.product.price).toFixed(2)).toFixed(2);
        });
        l = l + 1;
      });
    })

  }

  getListOfClientsOrders(): void {
    this.apiClientService.getAllClientsOrders().subscribe(ordersList => {
      this.ordersList = ordersList;

      let l: number = 0;
      this.orderSumList = new Array(this.ordersList.size);

      ordersList.forEach((o: any) => {
        this.orderSum = 0.0;
        o.products.forEach((p: any) => {
          this.orderSumList[l] = this.orderSum = +(this.orderSum + +(p.amount * p.product.price).toFixed(2)).toFixed(2);
        });
        l = l + 1;
      });
    })

  }

  getListOfDriversOrders(): void {
    this.apiClientService.getAllDriversOrders().subscribe(ordersList => {
      this.ordersList = ordersList;

      let l: number = 0;
      this.orderSumList = new Array(this.ordersList.size);

      ordersList.forEach((o: any) => {
        this.orderSum = 0.0;
        o.products.forEach((p: any) => {
          this.orderSumList[l] = this.orderSum = +(this.orderSum + +(p.amount * p.product.price).toFixed(2)).toFixed(2);
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
      this.setOrderDelivered(idAll[0]);
      this.ngOnInit();
    });
  }

  setOrderDelivered(id: string): void {
    if (this.appComponent.isAdmin) {
      this.orderStatus = {"status": "W trakcie realizacji"};
    } else {
      this.orderStatus = {"status": "Doręczone"};
    }
    console.log(this.orderStatus);
    console.log(id);
    this.apiClientService.setStatusInTheOrder(id, this.orderStatus).subscribe(did => {
      this.ngOnInit();
    });
  }


}
