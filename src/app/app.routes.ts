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
    path: 'doctors',
    title: 'Gestión de Doctores',
    loadComponent: () => import('./pages/doctors/doctors.component').then((m) => m.DoctorsComponent)
  },
  {
    path: 'specialties',
    title: 'Gestión de Especialidades',
    loadComponent: () => import('./pages/specialties/specialties.component').then((m) => m.SpecialtiesComponent)
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
