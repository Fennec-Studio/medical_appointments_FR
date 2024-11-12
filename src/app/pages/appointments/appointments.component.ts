import { Component } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';
import { Appointment } from '../../shared/interfaces/Appointment';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './appointments.component.html'
})
export class AppointmentsComponent {
  appointmentList: Appointment[] = [];
  pages = 0;
  pageIdx = 1;

  constructor(
    private _appointmentService: AppointmentService,
    private _authService: AuthService,
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
    await this._appointmentService.loadAppointments()
      .subscribe((response: Appointment[]) => {
        this.appointmentList = response
        this.paginationSetup();
    })
  }

  paginationSetup() {
    if (this.appointmentList.length === 0) {
      this.pages = 1;
    }
    this.pages = Math.ceil(this.appointmentList.length / 5);
  }

  updatePageIdx(pageIdx: number) {
    this.pageIdx = pageIdx;
  }

  showContentPage(pageIdx: number): Appointment[] {
    this.pageIdx = pageIdx;
    return this.appointmentList.slice((this.pageIdx - 1) * 5, this.pageIdx * 5);
  }
}
