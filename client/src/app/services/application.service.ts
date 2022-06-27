import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Application } from '../models/application';
import { baseUrl } from '../config';

// the data we get from API requests has the date as a string ISO timestamps,
// so we convert them as we get them here
type StringDateApplication = Omit<Omit<Application, 'started'>, 'updated'> & {
  started: string;
  updated: string;
};

function normalizeDate(application: StringDateApplication): Application {
  return {
    ...application,
    started: new Date(application.started),
    updated: new Date(application.updated),
  };
}

/**
 * service to handle all api request for Applications (the job application objects)
 */
@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor(private http: HttpClient) {}

  getAll(userId: number): Observable<Application[]> {
    return this.http
      .get<StringDateApplication[]>(`${baseUrl}/users/${userId}/applications/`)
      .pipe(map((data) => data.map(normalizeDate)));
  }
  get(userId: number, id: number): Observable<Application> {
    return this.http
      .get<StringDateApplication>(
        `${baseUrl}/users/${userId}/applications/${id}`
      )
      .pipe(map(normalizeDate));
  }
  create(userId: number, data: { company: string }): Observable<any> {
    return this.http.post(`${baseUrl}/users/${userId}/applications/`, data);
  }
  update(userId: number, id: number, data: { notes: string }): Observable<any> {
    return this.http.put(`${baseUrl}/users/${userId}/applications/${id}`, data);
  }
  delete(userId: number, id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/users/${userId}/applications/${id}`);
  }
}
