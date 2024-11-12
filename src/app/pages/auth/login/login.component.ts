import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) { }

  onLoginFormSubmit(): void {
    this._authService.login(this.email, this.password).subscribe(response => {
      if (response.success) {
        this._router.navigate(['/panel']);
      } else {
        alert(response.message);
      }
    });
  }

  ngOnInit(): void {
    if (this._authService.isLogged()) {
      this._router.navigate(['/panel']);
    }
  }

}
