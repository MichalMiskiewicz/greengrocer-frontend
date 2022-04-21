export class NewProductDTO {
  category: string = '';
  name: string = '';
  description: string = '';
  amount: number = 0;
  price: number = 0;

  constructor(category: string, name: string, description: string, amount: number, price: number) {
    this.category = category;
    this.name = name;
    this.description = description;
    this.amount = amount;
    this.price = price;
  }
}
