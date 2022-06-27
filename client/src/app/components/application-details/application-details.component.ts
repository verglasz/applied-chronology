import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Application } from 'src/app/models/application';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/services/application.service';
import { UserService } from 'src/app/services/user.service';
import { InterviewService } from 'src/app/services/interview.service';

/**
 * Display the info related to a job application, and the respective interviews
 */
@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss'],
})
export class ApplicationDetailsComponent implements OnInit, OnChanges {
  @Input() application!: Application;
  form!: FormGroup;
  editing = false;

  constructor(
    private fb: FormBuilder,
    private applSvc: ApplicationService,
    private usrSvc: UserService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.editing = false;
    this.resetForm();
  }

  resetForm() {
    this.form = this.fb.group({
      notes: this.application?.notes,
    });
  }

  refreshApplication() {
    this.applSvc.get(this.usrSvc.getUid(), this.application.id).subscribe({
      next: (data) => (this.application = data),
      error: (e) => console.error(e),
    });
  }

  setEditing() {
    this.editing = true;
  }

  saveNotes() {
    const notes = this.form.value.notes;
    this.applSvc
      .update(this.usrSvc.getUid(), this.application.id, { notes })
      .subscribe({
        next: () => {
          this.refreshApplication();
          this.editing = false;
        },
        error: (e) => console.error(e),
      });
  }
}
