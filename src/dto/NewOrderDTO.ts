import {verifyHostBindings} from "@angular/compiler";

export class NewOrderDTO {
  description: string = '';
  warnings: string = '';
  payment: any = {};
  products: any = {};

  constructor(description: string, warnings: string,  payment: string, products: any) {
    this.description = description;
    this.warnings = warnings;
    this.payment = payment;
    this.products = products;
  }
}
