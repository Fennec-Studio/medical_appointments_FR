import { Component } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { Doctor } from '../shared/interfaces/Doctor';
import { CommonModule } from '@angular/common';
import { DashboardCounter, ToolService } from '../services/tool.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
  ],
  standalone: true,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  // doctors: Doctor[] = [];
  dashboardCounter: DashboardCounter = {} as DashboardCounter;

  constructor(
    // private _doctorService:DoctorService,
    private _authService: AuthService,
    private _dashboardService: ToolService
  ) {}

  ngOnInit() {
    if (!this._authService.isLogged()) {
      window.location.href = '/login';
    } else {
      this.retrieveData();
    }
    // this._doctorService.getDoctors().
    //   subscribe((doctors: Doctor[]) => {
    //     this.doctors = doctors;
    //   });
  }

  async retrieveData() {
    await this._dashboardService.loadDashboardCounterInfo()
    .subscribe((response: any) => {
      this.dashboardCounter = response.data;
    });
  }
}
