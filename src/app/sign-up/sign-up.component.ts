import {Component, OnInit} from '@angular/core';
import {GreengrocerApiClientService} from "../../services/greengrocer-api-client.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  newUser: any = {};

  constructor(private apiClientService: GreengrocerApiClientService) {
  }

  ngOnInit(): void {
    this.formValidation();
    this.newUser.address = {};
    this.newUser.userType = {"name": "Kierowca"};
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

  signUp():void {
    console.log(JSON.stringify(this.newUser));
    this.apiClientService.postNewUser(this.newUser).subscribe(user => {
      console.log(user);
    });
  }

}
