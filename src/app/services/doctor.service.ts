import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Doctor } from '../shared/interfaces/Doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private doctorsSubject = new BehaviorSubject<Doctor[]>([]);
  doctors$ = this.doctorsSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadDoctors(): void {
    if (this.doctorsSubject.getValue().length === 0) {
      this.http.get<Doctor[]>(environment.API_URL + 'doctors')
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
