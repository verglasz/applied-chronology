import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { baseUrl } from '../config';
import { User } from '../models/user';

/**
 * Service to keep track of the current login status and
 * handle login and registration requests.
 *
 * Components that want to receive updates on login state changes
 * should `subscribe` to the respective Subjects
 */
// It's mostly temporary, waiting for proper authentication
// (basically right now everything is wrong with auth)
@Injectable({
  providedIn: 'root',
})
export class UserService {
  userId?: number;
  username?: string;
  loginChange = new Subject<number | undefined>(); // to subscribe to userId changes
  nameChange = new Subject<string | undefined>(); // to subscribe to username changes

  constructor(private http: HttpClient) {
    // set up the Subjects to update the instance values on .next(),
    // all changes should go through the Subjects and should
    // be initiated by the updateUid() method
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

  /**
   * Register a new user and log in as that user if successful,
   * or invoke the given callback if not, logging the error
   * if the callback returns a truthy value
   */
  register(
    data: { username: string; password: string },
    onError: (err: any) => any
  ) {
    this.create(data).subscribe({
      next: (data) => this.updateUid(data.id),
      error: (e) => {
        if (onError(e)) console.error(e);
      },
    });
  }

  create(data: { username: string; password: string }): Observable<User> {
    return this.http.post<User>(`${baseUrl}/users/`, data);
  }

  /**
   * Attempt to login, setting the login state if successful,
   * or invoke the given callback if not, logging the error
   * if the callback returns a truthy value
   */
  login(
    data: { username: string; password: string },
    onError: (err: any) => any
  ) {
    this.http.put<{ id: number }>(`${baseUrl}/users/login`, data).subscribe({
      next: (data) => this.updateUid(data.id),
      error: (e) => {
        if (onError(e)) console.error(e);
      },
    });
  }

  logout() {
    this.updateUid(undefined);
  }

  /**
   * Return uid as a defined number; this is for typescript convenience
   * (avoiding undefined checks) and should only be called by components
   * which are only available when logged in
   * to ensure it will return a valid uid
   */
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
