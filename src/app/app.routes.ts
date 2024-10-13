import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Genera tu cita',
    component: HomeComponent
  },
  {
    path: 'panel',
    title: 'Panel principal',
    loadComponent: () => import('./panel/dashboard.component').then((m) => m.DashboardComponent)
  },
  {
    path: 'appointments',
    title: 'Gestión de Citas',
    loadComponent: () => import('./pages/appointments/appointments.component').then((m) => m.AppointmentsComponent)
  },
  {
    path: 'patients',
    title: 'Gestión de Pacientes',
    loadComponent: () => import('./pages/patients/patients.component').then((m) => m.PatientsComponent)
  },
  {
    path: 'login',
    title: 'Acceder al sitio',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
