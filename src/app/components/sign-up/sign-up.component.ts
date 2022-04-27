import {Component, OnInit} from '@angular/core';
import {GreengrocerApiClientService} from "../../../services/greengrocer-api-client.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {AppComponent} from "../../app.component";

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
  }

  ngOnInit(): void {
    if (!this.tokenStorage.getToken() || this.tokenStorage.getToken() && this.tokenStorage.getUserType() === 'Admin') {
      this.formValidation();
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

  signUp(): void {
    console.log(JSON.stringify(this.newUser));
    this.apiClientService.postNewUser(this.newUser).subscribe(user => {
      console.log(user);
    });
    if (!this.tokenStorage.getToken()) {
      window.location.replace('');
    }
  }

}
