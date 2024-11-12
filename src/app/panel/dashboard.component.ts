import { Component } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { Doctor } from '../shared/interfaces/Doctor';
import { CommonModule } from '@angular/common';
import { DashboardCounter, ToolService } from '../services/tool.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
  ],
  standalone: true,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  dashboardCounter: DashboardCounter = {} as DashboardCounter;

  constructor(
    private _authService: AuthService,
    private _dashboardService: ToolService,
    private _router: Router,
  ) {}

  ngOnInit() {
    if (!this._authService.isLogged()) {
      this._router.navigate(['/']);
    } else {
      this.retrieveData();
    }
  }

  async retrieveData() {
    await this._dashboardService.loadDashboardCounterInfo()
    .subscribe((response: any) => {
      this.dashboardCounter = response.data;
    });
  }
}
