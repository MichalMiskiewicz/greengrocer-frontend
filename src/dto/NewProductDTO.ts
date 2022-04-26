export class NewProductDTO {
  category: string = '';
  name: string = '';
  description: string = '';
  amount: number = 0;
  imgFileSrc: string = '';
  price: number = 0;

  constructor(category: string, name: string, description: string, amount: number, imgFileSrc: string, price: number) {
    this.category = category;
    this.name = name;
    this.description = description;
    this.amount = amount;
    this.imgFileSrc = imgFileSrc;
    this.price = price;
  }
}
