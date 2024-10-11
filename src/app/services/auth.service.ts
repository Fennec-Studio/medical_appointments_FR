import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };

    return this.http.post<any>(environment.API_URL + 'users/login', body, { headers }).pipe(
      map((response) => {
        if (response.status === 200) {
          this.saveCredentials(response.user as AuthModel);
          return {
            success: true,
            user: response.user as AuthModel,
            message: response.message
          };
        } else {
          return {
            success: false,
            message: response.message
          };
        }
      }),
      catchError((error) => {
        console.error('Error en la autenticación:', error);
        return of({ success: false, message: 'Error en la autenticación' });
      })
    );
  }

  saveCredentials(user: AuthModel): void {
    if(!user) return;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getCredentials(): AuthModel {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLogged(): boolean {
    return !!this.getCredentials();
  }

  logout(): void {
    localStorage.removeItem('user');
    window.location.reload();
  }
}
interface AuthModel {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  role: Role;
}

enum Role {
  Doctor = 0,
  Administrator = 1
}
