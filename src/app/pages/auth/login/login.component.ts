import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private _authService: AuthService,
  ) { }

  onLoginFormSubmit(): void {
    this._authService.login(this.email, this.password).subscribe(response => {
      if (response.success) {
        window.location.href = '/panel';
      } else {
        alert(response.message);
      }
    });
  }

  ngOnInit(): void {
    if (this._authService.isLogged()) {
      window.location.href = '/panel';
    }
  }

}
