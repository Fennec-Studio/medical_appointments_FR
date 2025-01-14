import { Component } from '@angular/core';
import { Doctor } from '../../shared/interfaces/Doctor';
import { Specialty } from '../../shared/interfaces/Specialty';
import { DoctorService } from '../../services/doctor.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpecialtyService } from '../../services/specialty.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './doctors.component.html'
})
export class DoctorsComponent {
  doctorList: Doctor[] = [];
  pages = 0;
  pageIdx = 1;

  showModal:boolean = false;
  doctorToUpdate: Doctor = {} as Doctor;
  specialitySelect: Specialty[] = [];

  constructor(
    private _doctorService: DoctorService,
    private _specialtyService: SpecialtyService,
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
    await this._doctorService.loadDoctors()
      .subscribe((response: Doctor[]) => {
        this.doctorList = response
        this.paginationSetup();
    })
  }

  paginationSetup() {
    if (this.doctorList.length === 0) {
      this.pages = 1;
    }
    this.pages = Math.ceil(this.doctorList.length / 5);
  }

  updatePageIdx(pageIdx: number) {
    this.pageIdx = pageIdx;
  }

  showContentPage(pageIdx: number): Doctor[] {
    this.pageIdx = pageIdx;
    return this.doctorList.slice((this.pageIdx - 1) * 5, this.pageIdx * 5);
  }

  async toggleModal(idSelected?: number) {
    if(idSelected){
      this.doctorToUpdate = this.doctorList.find(doctor => doctor.id == idSelected) as Doctor;
      await this._specialtyService.loadSpecialties()
      .subscribe((response: Specialty[]) => {
        this.specialitySelect = response
       })
    }
    this.showModal = !this.showModal;
  }

  submitFormUpdate() {
    this._doctorService.updateDoctor(this.doctorToUpdate)
      .subscribe((response) => {
        if(response.status === 200) {
          this.retrieveData();
          this.toggleModal();
        } else {
          alert('Error updating doctor');
        }
      })
  }

}
