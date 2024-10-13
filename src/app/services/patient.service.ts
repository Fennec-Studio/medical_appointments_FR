import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Patient } from '../shared/interfaces/Patient';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private _httpClient: HttpClient) {}

  loadAppointments(): Observable<Patient[]> {
    return this._httpClient.get<Patient[]>(environment.API_URL + 'patients')
      .pipe((map((response) => {
        return response;
      }))
    );
  }
}
