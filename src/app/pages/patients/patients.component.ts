import { Component } from '@angular/core';
import { Patient } from '../../shared/interfaces/Patient';
import { PatientService } from '../../services/patient.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './patients.component.html'
})
export class PatientsComponent {
  patientList: Patient[] = [];
  pages = 0;
  pageIdx = 1;

  showModal:boolean = false;
  patientToUpdate:Patient = {} as Patient;

  constructor(
    private _patientService: PatientService,
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
    await this._patientService.loadAppointments()
      .subscribe((response: Patient[]) => {
        this.patientList = response
        this.paginationSetup();
    })
  }

  paginationSetup() {
    if (this.patientList.length === 0) {
      this.pages = 1;
    }
    this.pages = Math.ceil(this.patientList.length / 5);
  }

  updatePageIdx(pageIdx: number) {
    this.pageIdx = pageIdx;
  }

  showContentPage(pageIdx: number): Patient[] {
    this.pageIdx = pageIdx;
    return this.patientList.slice((this.pageIdx - 1) * 5, this.pageIdx * 5);
  }

  toggleModal(idSelected?: number) {
    if(idSelected){
      this.patientToUpdate = this.patientList.find(patient => patient.id == idSelected) as Patient;
    }
    this.showModal = !this.showModal;
  }

  async deletePatient(id: number) {
    await this._patientService.deletePatient(id)
      .subscribe(() => {
        this.retrieveData();
      });
  }

}
