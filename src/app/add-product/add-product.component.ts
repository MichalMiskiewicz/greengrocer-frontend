import {Component, OnInit} from '@angular/core';
import {GreengrocerApiClientService} from "../../services/greengrocer-api-client.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public newProduct: any = {};
  public imgSrc = "";
  appComponent: AppComponent;

  constructor(private apiClientService: GreengrocerApiClientService, private tokenStorage: TokenStorageService, appComponent: AppComponent) {
    this.appComponent = appComponent;
  }

  ngOnInit(): void {
    if (!this.tokenStorage.getToken()) {
      window.location.replace('');
    }
  }

  addProduct(): void {
    // @ts-ignore
    let image = (<HTMLInputElement>document.getElementById('image-file')).files[0];
    console.log(image);
    this.apiClientService.postImage(image).subscribe(res => {
        console.log(res);
        if (res.status == 200) {
          this.imgSrc = res.toString();
          this.newProduct.imgFileSrc = this.imgSrc;
          this.apiClientService.postNewProduct(this.newProduct).subscribe(product => {
            console.log(product);
          });
        } else {
          this.imgSrc = res.toString();
          this.newProduct.imgFileSrc = this.imgSrc;
          this.apiClientService.postNewProduct(this.newProduct).subscribe(product => {
            console.log(product);
          });
        }
      },
      err => alert(err));


  }

}
