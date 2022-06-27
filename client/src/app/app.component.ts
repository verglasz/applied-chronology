import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Applied Chronology';

  constructor(private userService: UserService) {}

  isLoggedIn(): boolean {
    return this.userService.userId !== undefined;
  }
}
