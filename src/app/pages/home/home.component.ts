import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    if(this._authService.isLogged()) {
      this._router.navigate(['/panel']);
    }
  }
}
