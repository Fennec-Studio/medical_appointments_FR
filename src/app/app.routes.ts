import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Inicio',
    component: HomeComponent
  },
  {
    path: 'panel',
    title: 'Dashboard',
    loadComponent: () => import('./panel/dashboard.component').then((m) => m.DashboardComponent)
  },
  {
    path: 'appointments',
    title: 'Citas',
    loadComponent: () => import('./pages/appointments/appointments.component').then((m) => m.AppointmentsComponent)
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
