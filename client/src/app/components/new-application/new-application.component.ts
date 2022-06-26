import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/services/application.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-application',
  templateUrl: './new-application.component.html',
  styleUrls: ['./new-application.component.scss'],
})
export class NewApplicationComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  @Output() onCreate = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private applSvc: ApplicationService,
    private usrSvc: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({ company: [null, Validators.required] });
  }

  create(form: FormGroup) {
    const company = form.value.company;
    this.applSvc.create(this.usrSvc.userId!, { company }).subscribe({
      next: () => {
        this.submitted = true;
        this.onCreate.emit();
        this.form.reset();
      },
      error: (e) => console.error(e),
    });
  }

  new() {
    this.submitted = false;
  }
}
