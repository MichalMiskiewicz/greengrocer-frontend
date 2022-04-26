import {Component, OnInit} from '@angular/core';
import {GreengrocerApiClientService} from "../../services/greengrocer-api-client.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {AppComponent} from "../app.component";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public newProduct: any = {};
  public imgSrc = "";
  filePath: string = "https://andrukiewicz.elk.pl/wp-content/uploads/2014/09/brak-1-Kopia-2.jpg";
  myForm: FormGroup;
  appComponent: AppComponent;

  constructor(private apiClientService: GreengrocerApiClientService, private tokenStorage: TokenStorageService, appComponent: AppComponent, public fb: FormBuilder) {
    this.appComponent = appComponent;
    this.myForm = this.fb.group({
      img: [null],
      filename: ['']
    })
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

  imagePreview(e: Event) {
    // @ts-ignore
    const file = (e.target as HTMLInputElement).files[0];
    // @ts-ignore
    this.myForm.patchValue({
      img: file
    });
    // @ts-ignore
    this.myForm.get('img').updateValueAndValidity()
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

}
