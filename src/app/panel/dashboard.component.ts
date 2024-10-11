import { Component } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { Doctor } from '../shared/interfaces/Doctor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
  ],
  standalone: true,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  doctors: Doctor[] = [];

  constructor(
    private _doctorService:DoctorService
  ) {}

  ngOnInit(): void {
    this._doctorService.getDoctors().
      subscribe((doctors: Doctor[]) => {
        this.doctors = doctors;
      });
  }
}
