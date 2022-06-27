import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  form!: FormGroup;
  hidePw: boolean = true;
  duplicateUser = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [
        null,
        [Validators.required, Validators.pattern(/^[A-Za-z0-9@_.-]*$/)],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9 @_.,!?;:#$%^*()-]*$/),
        ],
      ],
    });
  }

  submit(form: FormGroup): void {
    this.duplicateUser = false;
    const { username, password } = form.value;
    this.userService.register({ username, password }, (err) => {
      if (err.status === 409) {
        this.duplicateUser = true;
        return false;
      }
      return true;
    });
  }
}
