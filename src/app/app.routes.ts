import { Routes } from '@angular/router';
import { DashboardComponent } from './panel/dashboard.component';
import { LoginComponent } from './pages/auth/login/login.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
