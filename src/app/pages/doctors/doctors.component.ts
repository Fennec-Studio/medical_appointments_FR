import { Component } from '@angular/core';
import { Doctor } from '../../shared/interfaces/Doctor';
import { DoctorService } from '../../services/doctor.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './doctors.component.html'
})
export class DoctorsComponent {
  doctorList: Doctor[] = [];
  pages = 0;
  pageIdx = 1;

  constructor(
    private _doctorService: DoctorService,
    private _authService: AuthService
  ) {}


  ngOnInit() {
    if (!this._authService.isLogged()) {
      window.location.href = '/';
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
}
