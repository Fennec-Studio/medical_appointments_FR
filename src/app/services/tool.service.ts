import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  constructor(private _http: HttpClient) {}

  loadDashboardCounterInfo(): Observable<DashboardCounter> {
    return this._http.get<DashboardCounter>(environment.API_URL + 'dashboard')
      .pipe((map((response) => {
        return response;
      }))
    );
  }
}

export interface DashboardCounter {
  doctors: number;
  patients: number;
  appointments: number;
  specialties: number;
  users: number;
}
