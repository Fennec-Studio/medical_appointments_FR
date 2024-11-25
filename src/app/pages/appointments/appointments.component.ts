import { Component } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';
import { Appointment } from '../../shared/interfaces/Appointment';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TimeFixedPipe, DateFixedPipe } from '../../pipes/datesFixed.pipe';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    CommonModule,
    DateFixedPipe,
    TimeFixedPipe,
  ],
  templateUrl: './appointments.component.html'
})
export class AppointmentsComponent {
  appointmentList: Appointment[] = [];
  pages = 0;
  pageIdx = 1;

  showModal:boolean = false;
  appointmentToUpdate:Appointment = {} as Appointment;
  minDate: string = '';
  maxDate: string = '';
  minTime: string = '08:00';
  maxTime: string = '19:00';

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

  toggleModal(idSelected?: number) {
    if(idSelected) {
      this.setWeekRange();
      this.appointmentToUpdate = this.appointmentList.find(appointment => appointment.id === idSelected) as Appointment;
    }
    this.showModal = !this.showModal;
  }

  setWeekRange(): void {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    this.minDate = new Date(startOfWeek).toISOString().split('T')[0];
    this.maxDate = new Date(endOfWeek).toISOString().split('T')[0];

    this.minTime = '08:00';
    this.maxTime = '19:00';
  }

  async deleteAppointment(id: number) {
    await this._appointmentService.deleteAppointment(id)
      .subscribe(() => {
        this.retrieveData();
      });
  }

  async updateAppointmentStatus(id: number) {
    const appointment = this.appointmentList.find(appointment => appointment.id === id) as Appointment;
    appointment.status = appointment.status === 0 ? 1 : 0;
    await this._appointmentService.updateAppointmentStatus(appointment)
      .subscribe(() => {
        this.retrieveData();
      });
  }
}
