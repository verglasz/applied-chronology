import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { baseUrl } from '../config';
import { User } from '../models/user';

/* This service keeps track of the current login status and
 * handles login and registration requests.
 *
 * It's mostly temporary, waiting for proper authentication
 * (basically right now everything is wrong with auth)
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  userId?: number;
  username?: string;
  loginChange = new Subject<number | undefined>(); // to subscribe to userId changes
  nameChange = new Subject<string | undefined>(); // to subscribe to username changes

  constructor(private http: HttpClient) {
    // set up the Subjects to update the instance values on .next()
    this.loginChange.subscribe((value) => {
      this.userId = value;
    });
    this.nameChange.subscribe((value) => {
      this.username = value;
    });
    // retrieve saved login data if present
    const savedId = window.localStorage.getItem('userId');
    if (savedId) this.updateUidFromString(savedId);
  }

  // register a new user and log in as that user if successful
  register(data: { username: string; password: string }) {
    this.create(data).subscribe({
      next: (data) => {
        console.log(data), this.updateUid(data.id);
      },
      error: (e) => console.error(e),
    });
  }

  create(data: { username: string; password: string }): Observable<User> {
    return this.http.post<User>(`${baseUrl}/users/`, data);
  }

  // attempt to login, setting the login state if successful or
  // executing the provided callback in case of invalid credentials
  login(
    data: { username: string; password: string },
    invalidCallback: () => any
  ) {
    this.http.put<{ id: number }>(`${baseUrl}/users/login`, data).subscribe({
      next: (data) => this.updateUid(data.id),
      error: (e) => {
        if (e.status == 403) {
          invalidCallback();
        } else {
          console.error(e);
        }
      },
    });
  }

  logout() {
    this.updateUid(undefined);
  }

  // this function should only be called by components
  // which are only available when logged in
  getUid(): number {
    if (this.userId === undefined) {
      // XXX: maybe throw instead
      console.error('getUid() called while logged out!');
      return -1;
    }
    return this.userId;
  }

  updateUidFromString(id: string) {
    const uid = parseInt(id);
    if (isNaN(uid)) {
      console.error('setting login with invalid id: ', id);
      return;
    }
    this.updateUid(uid);
  }

  // handle the change of login uid, passing the value to the
  // respective subject, retrieving the new username,
  // and persisting the data to LocalStorage;
  // all changes to login state should ultimately go through this method
  updateUid(uid?: number) {
    this.loginChange.next(uid);
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
