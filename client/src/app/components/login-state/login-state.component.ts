import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-state',
  templateUrl: './login-state.component.html',
  styleUrls: ['./login-state.component.scss'],
})
export class LoginStateComponent implements OnInit {
  username?: number;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.username = this.userService.userId;
    this.userService.loginChange.subscribe((value) => {
      this.username = value;
    });
  }

  logout() {
    this.userService.unsetLogin();
  }
}
