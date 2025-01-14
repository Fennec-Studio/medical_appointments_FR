import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';

import { Doctor } from '../shared/interfaces/Doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor(private _httpClient: HttpClient) {}

  loadDoctors(): Observable<Doctor[]> {
    return this._httpClient.get<Doctor[]>(environment.API_URL + 'doctors')
      .pipe((map((response) => {
        return response;
      }))
    );
  }

  updateDoctor(doctor: Doctor): Observable<any> {
    return this._httpClient.put(environment.API_URL + 'doctors/' + doctor.id, doctor)
      .pipe((map((response) => {
        return response;
      }))
    );
  }
}
