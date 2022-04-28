import {Component} from '@angular/core';
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'greengrocer-frontend';
  loggedIn = true;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  isClient: boolean = false;
  isDriver: boolean = false;
  isAdmin: boolean = false;
  shoppingCartActive: boolean = false;
  shoppingCart = new Map<string, number>();
  shoppingKeys: any;
  amount: number | undefined = 1;
  sumCart: any = 0.00;
  countCart: any = 0;

  constructor(public tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      let user = this.tokenStorage.getUserType();
      console.log(user)
      if (user === "Admin") {
        this.isAdmin = true;
      } else if (user === "Kierowca") {
        this.isDriver = true;
      } else if (user === "Klient") {
        this.isClient = true;
      }
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
          /*document.getElementById("sign-in-button")!.setAttribute("disabled", "disabled")*/
        }, false)
      })
  };

  makeActive(item: any): void {
    document.querySelectorAll(".nav-item > a")!.forEach(it => {
      it.className = "nav-link text-light";
      // @ts-ignore
      it.parentElement.setAttribute("style", "border-bottom: 1px white solid;");
      // @ts-ignore
      it.parentElement.className = "nav-item";
    })
    item.className = "nav-link text-light active";
    item.parentElement.setAttribute("style", "border-bottom: none !important;");
  }

  logout(): void {
    document.getElementById("sign-out-button")!.innerText="Wylogowywanie...";
    this.tokenStorage.signOut();
  }
}


