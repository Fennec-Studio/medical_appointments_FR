import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Doctor } from '../../shared/interfaces/Doctor';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private _urlBase = 'http://medicalappointments_api.test/api/';

  private doctorsSubject = new BehaviorSubject<Doctor[]>([]);
  doctors$ = this.doctorsSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadDoctors(): void {
    if (this.doctorsSubject.getValue().length === 0) {
      this.http.get<Doctor[]>(this._urlBase + 'doctors')
        .pipe(
          tap(doctors => this.doctorsSubject.next(doctors))
        )
        .subscribe();
    }
  }

  getDoctors(): Observable<any[]> {
    this.loadDoctors();
    return this.doctors$;
  }
}
