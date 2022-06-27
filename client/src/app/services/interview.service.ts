import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Interview } from '../models/interview';
import { baseUrl } from '../config';

// the data we get from API requests has the date as a string ISO timestamps,
// so we convert them as we get them here
type StringDateInterview = Omit<Interview, 'date'> & {
  date: string;
};

function normalizeDate(interview: StringDateInterview): Interview {
  return {
    ...interview,
    date: new Date(interview.date),
  };
}

/**
 * service to handle all api request for Interviews (the job interview objects)
 */
@Injectable({
  providedIn: 'root',
})
export class InterviewService {
  constructor(private http: HttpClient) {}

  getAll(userId: number, parentApplication?: number): Observable<Interview[]> {
    const query = parentApplication ? `?application=${parentApplication}` : '';
    return this.http
      .get<StringDateInterview[]>(
        `${baseUrl}/users/${userId}/interviews/${query}`
      )
      .pipe(map((data) => data.map(normalizeDate)));
  }
  get(userId: number, id: number): Observable<Interview> {
    return this.http
      .get<StringDateInterview>(`${baseUrl}/users/${userId}/interviews/${id}`)
      .pipe(map(normalizeDate));
  }
  create(
    userId: number,
    data: { applicationId: number; date: Date; notes: string }
  ): Observable<any> {
    return this.http.post(`${baseUrl}/users/${userId}/interviews/`, data);
  }
  update(
    userId: number,
    id: number,
    data: { date?: Date; notes?: string }
  ): Observable<any> {
    return this.http.put(`${baseUrl}/users/${userId}/interviews/${id}`, data);
  }
  delete(userId: number, id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/users/${userId}/interviews/${id}`);
  }
}
