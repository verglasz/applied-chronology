import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Application } from 'src/app/models/application';
import { Interview } from 'src/app/models/interview';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from 'src/app/services/application.service';
import { UserService } from 'src/app/services/user.service';
import { InterviewService } from 'src/app/services/interview.service';

/**
 * Display the list of the interviews related to one application,
 * with respective notes
 */
@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.scss'],
})
export class InterviewListComponent implements OnInit {
  @Input() applicationId!: number;
  interviews!: Interview[];
  editing?: number;

  newForm!: FormGroup;
  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private intvSvc: InterviewService,
    private usrSvc: UserService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.fetchInterviews();
    this.resetNewForm();
    this.resetEditForm();
  }

  resetEditForm() {
    this.editForm = this.fb.group({});
  }

  resetNewForm() {
    this.newForm = this.fb.group({
      date: [null, Validators.required],
      time: [null, Validators.required],
      notes: null,
    });
  }

  fetchInterviews() {
    this.intvSvc.getAll(this.usrSvc.getUid(), this.applicationId).subscribe({
      next: (data) => {
        this.interviews = data.sort(
          (a, b) => a.date.valueOf() - b.date.valueOf()
        );
      },
      error: (e) => console.error(e),
    });
  }

  create() {
    const { notes, date, time }: { notes: string; date: Date; time: string } =
      this.newForm.value;
    const [hours, minutes] = time.split(':').map((x) => parseInt(x));
    date.setHours(hours, minutes);
    this.intvSvc
      .create(this.usrSvc.getUid(), {
        applicationId: this.applicationId,
        date,
        notes,
      })
      .subscribe({
        next: () => {
          this.fetchInterviews();
          this.resetNewForm();
        },
        error: (e) => console.error(e),
      });
  }
}
