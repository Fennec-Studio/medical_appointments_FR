import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Appointment } from '../../shared/interfaces/Appointment';
import { DoctorService } from '../../services/doctor.service';
import { SpecialtyService } from '../../services/specialty.service';
import { AppointmentService } from '../../services/appointment.service';
import { Doctor } from '../../shared/interfaces/Doctor';
import { Specialty } from '../../shared/interfaces/Specialty';
import { Patient } from '../../shared/interfaces/Patient';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  filterByMedic: boolean = true;
  search: string = '';

  newAppointment: Appointment = {} as Appointment;

  curp: string = '';
  last_name: string = '';
  first_name: string = '';
  email: string = '';
  phone: string = '';

  doctorList: Doctor[] = [];
  specialtiesList: Specialty[] = [];
  searchResults: any[] = [];

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _doctorService: DoctorService,
    private _specialtyService: SpecialtyService,
    private _appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    if(this._authService.isLogged()) {
      this._router.navigate(['/panel']);
    }

    this.retrieveData();

    if (!this.newAppointment.patient) {
      this.newAppointment.patient = {
        curp: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
      } as Patient;
    }
  }

  toggleFilterSelector() {
    this.filterByMedic = !this.filterByMedic;
    if (this.filterByMedic) {
      this.searchResults = this.doctorList;
    } else {
      this.searchResults = this.specialtiesList;
    }
  }

  async retrieveData() {
    await this._doctorService.loadDoctors()
      .subscribe((response: Doctor[]) => {
        this.doctorList = response;
        this.searchResults = response;
    });

    await this._specialtyService.loadSpecialties()
      .subscribe((response: Specialty[]) => {
        this.specialtiesList = response;
    });

  }

  searchMedicOrSpecialty() {
    if (this.search.trim().length >= 2) {
      if (this.filterByMedic) {
        this.searchResults = this.doctorList.filter((doctor: Doctor) => {
          return doctor.first_name.toLowerCase().includes(this.search.toLowerCase()) || doctor.last_name.toLowerCase().includes(this.search.toLowerCase());
        });

        let exactMatch = this.searchResults.filter((doctor: Doctor) => {
          return doctor.first_name.toLowerCase() === this.search.toLowerCase() || doctor.last_name.toLowerCase() === this.search.toLowerCase();
        });

        let partialMatch = this.searchResults.filter((doctor: Doctor) => {
          return doctor.first_name.toLowerCase().includes(this.search.toLowerCase()) || doctor.last_name.toLowerCase().includes(this.search.toLowerCase());
        });

        let wordMatch = this.searchResults.filter((doctor: Doctor) => {
          return doctor.first_name.toLowerCase().split(' ').includes(this.search.toLowerCase()) || doctor.last_name.toLowerCase().split(' ').includes(this.search.toLowerCase());
        });

        this.searchResults = exactMatch.concat(partialMatch).concat(wordMatch);
      } else {
        this.searchResults = this.specialtiesList.filter((specialty: Specialty) => {
          return specialty.name.toLowerCase().includes(this.search.toLowerCase());
        });

        let exactMatch = this.searchResults.filter((specialty: Specialty) => {
          return specialty.name.toLowerCase() === this.search.toLowerCase();
        });

        let partialMatch = this.searchResults.filter((specialty: Specialty) => {
          return specialty.name.toLowerCase().includes(this.search.toLowerCase());
        });

        let wordMatch = this.searchResults.filter((specialty: Specialty) => {
          return specialty.name.toLowerCase().split(' ').includes(this.search.toLowerCase());
        });

        this.searchResults = exactMatch.concat(partialMatch).concat(wordMatch);
      }
    } else {
      this.searchResults = this.filterByMedic ? this.doctorList : this.specialtiesList;
    }
    return;
  }

  selectSchedule(doctorId: number, timeIdx: number) {
    const doctor = this.doctorList.find(doc => doc.id === doctorId);
    if (!doctor) return;

    const schedule = doctor.schedule[timeIdx];
    if (!schedule.available) return;

    if (schedule.selected) {
      schedule.selected = false;
      this.newAppointment = {} as Appointment;
      this.searchResults = this.doctorList;
    } else {
      this.doctorList.forEach(doc => {
        doc.schedule.forEach(sch => (sch.selected = false));
      });

      schedule.selected = true;
      const today = new Date();
      const [hours, minutes] = schedule.time.split(':').map(Number);
      today.setHours(hours, minutes, 0, 0);

      this.newAppointment = {
        doctor,
        date: today,
      } as Appointment;

      this.searchResults = this.doctorList.filter(doc =>
        doc.schedule.some(sch => sch.selected)
      );
    }
  }

  submitForm() {
    if (!this.newAppointment.doctor || !this.newAppointment.date) {
      return;
    }
    this.newAppointment.patient = {
      curp: this.curp,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone,
      birthdate: new Date(),
      address: 'Rellenar información'
    } as Patient;

    this._appointmentService.storeAppointment(this.newAppointment).subscribe((response) => {
      if(response.status === 200) {
        alert('Cita agendada correctamente');
        window.location.reload();
      } else {
        alert('Error al agendar la cita');
      }
    });
  }


}
