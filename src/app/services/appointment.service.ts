import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Appointment } from '../shared/interfaces/Appointment';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private _httpClient: HttpClient) {}

  loadAppointments(): Observable<Appointment[]> {
    return this._httpClient.get<Appointment[]>(environment.API_URL + 'appointments')
      .pipe((map((response) => {
        return response;
      }))
    );
  }
}
