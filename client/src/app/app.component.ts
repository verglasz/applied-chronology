import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Applied Chronology';
  logged: boolean;

  constructor(private userService: UserService) {
    this.logged = !!userService.userId;
    userService.loginChange.subscribe((value) => {
      this.logged = !!value;
    });
  }
}
