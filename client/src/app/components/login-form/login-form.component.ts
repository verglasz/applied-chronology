import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;
  hidePw: boolean = true;
  wrongCredentials = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [
        null,
        [Validators.required, Validators.pattern(/^[A-Za-z0-9@_.-]*$/)],
      ],
      password: [null, Validators.required],
    });
  }

  submit(form: FormGroup): void {
    this.wrongCredentials = false;
    const { username, password } = form.value;
    this.userService.login({ username, password }, (err) => {
      if (err.status === 403) {
        this.wrongCredentials = true;
        return false;
      }
      return true;
    });
  }
}
