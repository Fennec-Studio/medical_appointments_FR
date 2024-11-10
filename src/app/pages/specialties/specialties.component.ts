import { Component } from '@angular/core';
import { Specialty } from '../../shared/interfaces/Specialty';
import { SpecialtyService } from '../../services/specialty.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specialties',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './specialties.component.html'
})
export class SpecialtiesComponent {
  specialtiesList: Specialty[] = [];
  pages = 0;
  pageIdx = 1;

  constructor(
    private _specialtyService: SpecialtyService,
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
    await this._specialtyService.loadSpecialties()
      .subscribe((response: Specialty[]) => {
        this.specialtiesList = response
        this.paginationSetup();
    })
  }

  paginationSetup() {
    if (this.specialtiesList.length === 0) {
      this.pages = 1;
    }
    this.pages = Math.ceil(this.specialtiesList.length / 5);
  }

  updatePageIdx(pageIdx: number) {
    this.pageIdx = pageIdx;
  }

  showContentPage(pageIdx: number): Specialty[] {
    this.pageIdx = pageIdx;
    return this.specialtiesList.slice((this.pageIdx - 1) * 5, this.pageIdx * 5);
  }
}
