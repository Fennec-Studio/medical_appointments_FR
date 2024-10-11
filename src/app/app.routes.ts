import { Routes } from '@angular/router';
import { DashboardComponent } from './panel/dashboard.component';
import { LoginComponent } from './pages/auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Dashboard',
    component: DashboardComponent
  },
  {
    path: 'login',
    title: 'Acceder',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
