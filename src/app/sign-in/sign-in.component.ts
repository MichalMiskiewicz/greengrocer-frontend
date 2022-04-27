import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginDetails:any ={};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  appComponent:AppComponent;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, appComponent:AppComponent) {
    this.appComponent = appComponent;
  }

  ngOnInit(): void {
    this.formValidation();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      if(this.appComponent.isAdmin || this.appComponent.isClient)
        window.location.replace('products');
      else{
        window.location.replace('orders');
      }
    }
  }

  onSubmit(): void {
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
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });


  }

  reloadPage(): void {
    window.location.reload();
  }


  formValidation(): void {
    let forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event: { preventDefault: () => void; stopPropagation: () => void; }) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
  };
}
