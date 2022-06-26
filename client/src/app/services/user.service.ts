import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { baseUrl } from '../config';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userId?: number;
  username?: string;
  loginChange = new Subject<number | undefined>();
  nameChange = new Subject<string | undefined>();

  constructor(private http: HttpClient) {
    this.loginChange.subscribe((value) => {
      this.updateUid(value);
    });
    this.nameChange.subscribe((value) => {
      this.username = value;
    });
    const savedId = window.localStorage.getItem('userId');
    if (savedId) this.updateUid(parseInt(savedId));
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

  login(
    data: { username: string; password: string },
    invalidCallback: () => any
  ) {
    this.http.put<{ id: string }>(`${baseUrl}/users/login`, data).subscribe({
      next: (data) => this.setLogin(data.id),
      error: (e) => {
        if (e.status == 403) {
          invalidCallback();
        } else {
          console.error(e);
        }
      },
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
      this.username = undefined;
    } else {
      this.http.get<User>(`${baseUrl}/users/${uid}`).subscribe({
        next: (data) => this.nameChange.next(data.username),
        error: (e) => console.error(e),
      });
      window.localStorage.setItem('userId', uid.toString());
    }
  }
}
