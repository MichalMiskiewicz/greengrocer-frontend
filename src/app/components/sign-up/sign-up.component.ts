import {Component, OnInit} from '@angular/core';
import {GreengrocerApiClientService} from "../../../services/greengrocer-api-client.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {AppComponent} from "../../app.component";
import {document} from "ngx-bootstrap/utils";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  newUser: any = {};
  appComponent: AppComponent;

  constructor(private apiClientService: GreengrocerApiClientService, private tokenStorage: TokenStorageService, appComponent: AppComponent) {
    this.appComponent = appComponent;
  }

  ngAfterViewInit() {
    if (this.tokenStorage.getToken() && this.tokenStorage.getUserType() === 'Admin' && document.getElementById("create-user")) {
      document.getElementById("create-user")!.className = "col-md-4 col-sm-12 shadow-lg p-5 w-75";
    }
    this.appComponent.formValidation();
  }

  ngOnInit(): void {
    if (!this.tokenStorage.getToken() || this.tokenStorage.getToken() && this.tokenStorage.getUserType() === 'Admin') {
      this.newUser.address = {};
      if (!this.tokenStorage.getToken()) {
        this.newUser.userType = "Klient";
      } else {
        this.newUser.userType = "Kierowca";
      }
    } else {
      window.location.replace('');
    }
  }

  signUp(): void {
    if (document.getElementById("sign-up-form").checkValidity()) {
      console.log(JSON.stringify(this.newUser));
      this.apiClientService.postNewUser(this.newUser).subscribe(user => {
        console.log(user);
      });
      if (!this.tokenStorage.getToken()) {
        window.location.replace('');
      }
    }
  }

}
