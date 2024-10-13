import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    if(this._authService.isLogged()) {
      window.location.href = '/panel';
    }
  }
}
