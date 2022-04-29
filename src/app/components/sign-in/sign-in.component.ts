import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {AppComponent} from "../../app.component";
import {document} from "ngx-bootstrap/utils";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginDetails: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  appComponent: AppComponent;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, appComponent: AppComponent) {
    this.appComponent = appComponent;
  }

  ngAfterViewInit() {
    this.appComponent.formValidation();
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      if (this.appComponent.isAdmin || this.appComponent.isClient)
        window.location.replace('products');
      else {
        window.location.replace('orders');
      }
    }
  }

  onSubmit(): void {
    document.getElementById("login-password")!.setCustomValidity("");
    document.getElementById("login-username")!.setCustomValidity("");
    if (document.getElementById("sign-in-form").checkValidity()) {
      this.authService.login(this.loginDetails).subscribe({
        next: data => {
          console.log(data);
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data.username);
          this.tokenStorage.saveUserType(data.userType);
          this.tokenStorage.saveUserID(data.id);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          window.location.replace('');
        },
        error: err => {
          //alert("Błędny login lub hasło!");
          document.getElementById("login-password")!.setCustomValidity("błędne hasło");
          document.getElementById("login-username")!.setCustomValidity("błędna nazwa użytkownika");
          document.getElementById("login-password-invalid")!.innerText = "lub hasło!";
          document.getElementById("login-username-invalid")!.innerText = "Błedna nazwa użytkownika";
        }
      });
    }
  }
}
