import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-main-navbar',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(private _authService: AuthService) { }

  logout(): void {
    this._authService.logout();
  }
}
