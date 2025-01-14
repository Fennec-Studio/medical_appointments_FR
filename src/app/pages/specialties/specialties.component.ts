import { Component } from '@angular/core';
import { Specialty } from '../../shared/interfaces/Specialty';
import { SpecialtyService } from '../../services/specialty.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-specialties',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './specialties.component.html'
})
export class SpecialtiesComponent {
  specialtiesList: Specialty[] = [];
  pages = 0;
  pageIdx = 1;

  showModal:boolean = false;
  specialtiesToUpdate: Specialty = {} as Specialty;

  constructor(
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

  toggleModal(idSelected?: number) {
    if(idSelected) {
      this.specialtiesToUpdate = this.specialtiesList.find(specialties => specialties.id === idSelected) as Specialty;
    }
    this.showModal = !this.showModal;
  }

  submitFormUpdate() {

    this._specialtyService.updateSpecialty(this.specialtiesToUpdate)
      .subscribe((response) => {
        console.log(response)
        if(response.status === 200) {
          this.retrieveData();
          this.toggleModal();
        } else {
          alert('Error updating Specialty');
        }
      })
  }
}
