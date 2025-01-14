import { Component } from '@angular/core';
import { Patient, MedicalHistory } from '../../shared/interfaces/Patient';
import { PatientService } from '../../services/patient.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DateFixedPipe } from '../../pipes/datesFixed.pipe';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DateFixedPipe,
  ],
  templateUrl: './patients.component.html'
})
export class PatientsComponent {
  patientList: Patient[] = [];
  pages = 0;
  pageIdx = 1;

  showModal:boolean = false;
  showModalOnView:boolean = false;
  patientToUpdate:Patient = {
    id: 0,
    curp: '',
    first_name: '',
    last_name: '',
    birthdate: new Date(),
    email: '',
    phone: '',
    address: '',
    created_at: '',
    updated_at: '',
    medical_history: {
      id: 0,
      patient_id: 0,
      age: 0,
      blood_type: '',
      allergies: '',
      medications: '',
      gender: '',
      height: 0,
      weight: 0,
      created_at: '',
      updated_at: '',
    } as MedicalHistory,
  } as Patient;

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
    if (idSelected) {
      const selectedPatient = this.patientList.find(patient => patient.id === idSelected);
      if (selectedPatient) {
        this.patientToUpdate = {
          ...selectedPatient,
          medical_history: selectedPatient.medical_history || {
            patient_id: selectedPatient.id,
            age: 0,
            blood_type: '',
            allergies: '',
            medications: '',
            gender: '',
            height: 0,
            weight: 0,
            created_at: '',
            updated_at: '',
          }
        };
      }
    }
    this.showModal = !this.showModal;
  }

  onSubmitFormUpdate() {
    this._patientService.updatePatient(this.patientToUpdate)
      .subscribe((response) => {
        if(response.status === 200) {
          this.retrieveData();
          this.toggleModal();
        } else {
          alert('Error updating patient');
        }
      });
  }

  async deletePatient(id: number) {
    await this._patientService.deletePatient(id)
      .subscribe(() => {
        this.retrieveData();
      });
  }

}
