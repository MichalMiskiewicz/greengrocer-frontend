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
  private roles: string[] = [];

  constructor(private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      console.log(user);
      if (user === 'Admin') {
        this.isAdmin = true;
      } else if (user === 'Kierowca') {
        this.isDriver = true;
      } else if (user === 'Klient') {
        this.isClient = true;
      }
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.replace('');
  }
}


