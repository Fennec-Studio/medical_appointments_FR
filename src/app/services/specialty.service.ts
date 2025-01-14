import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Specialty } from '../shared/interfaces/Specialty';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  constructor(private _httpClient: HttpClient) {}

  loadSpecialties(): Observable<Specialty[]> {
    return this._httpClient.get<Specialty[]>(environment.API_URL + 'specialties')
      .pipe((map((response) => {
        return response;
      }))
    );
  }

  updateSpecialty(specialty: Specialty): Observable<any> {
    return this._httpClient.put(environment.API_URL + 'specialties/' + specialty.id, specialty)
      .pipe((map((response) => {
        return response;
      }))
    );
  }
}
