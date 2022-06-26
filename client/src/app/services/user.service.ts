import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { baseUrl } from '../config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userId?: number;
  loginChange = new Subject<number | undefined>();

  constructor(private http: HttpClient) {
    const savedId = window.localStorage.getItem('userId');
    if (savedId) this.userId = parseInt(savedId);
    this.loginChange.subscribe((value) => {
      this.updateUid(value);
    });
  }

  register(data: { username: string; password: string }) {
    this.create(data).subscribe({
      next: (data) => this.setLogin(data.id),
      error: (e) => console.error(e),
    });
  }

  create(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${baseUrl}/users/`, data);
  }

  login(data: { username: string; password: string }) {
    this.http.put<any>(`${baseUrl}/users/login`, data).subscribe({
      next: (data) => this.setLogin(data.id),
      error: (e) => console.error(e),
    });
  }

  setLogin(id: string) {
    const uid = parseInt(id);
    if (isNaN(uid)) {
      console.error('setting login with invalid id: ', id);
      return;
    }
    this.loginChange.next(uid);
  }

  unsetLogin() {
    this.loginChange.next(undefined);
  }

  getUid(): number {
    if (this.userId === undefined) {
      // XXX: maybe throw instead
      console.error('getUid() called while logged out!');
      return -1;
    }
    return this.userId;
  }

  updateUid(uid?: number) {
    this.userId = uid;
    if (uid === undefined) {
      window.localStorage.removeItem('userId');
    } else {
      window.localStorage.setItem('userId', uid.toString());
    }
  }
}
