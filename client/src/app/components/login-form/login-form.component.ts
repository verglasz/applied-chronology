import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;
  hidePw: boolean = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [
        null,
        [Validators.required, Validators.pattern(/^[A-Za-z0-9@_.-]*$/)],
      ],
      password: [null, Validators.required],
    });
  }

  submit(form: FormGroup): void {}
}
