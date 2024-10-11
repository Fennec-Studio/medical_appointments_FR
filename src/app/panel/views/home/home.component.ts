import { Component } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../../shared/interfaces/Doctor';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule
  ],
  standalone: true,
  templateUrl: './home.component.html',
})
export class HomeComponent {
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
