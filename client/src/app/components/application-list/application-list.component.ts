import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/models/application';
import { ApplicationService } from 'src/app/services/application.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss'],
})
export class ApplicationListComponent implements OnInit {
  applications: Application[] = [];
  selected?: number;
  creating = false;

  constructor(
    private applSvc: ApplicationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchApplications();
  }

  fetchApplications(): void {
    const userId = this.userService.userId;
    if (!userId) {
      console.error('Rendering application list while not logged in!');
      return;
    }
    this.applSvc.getAll(userId).subscribe({
      next: (data) => (this.applications = data),
      error: (e) => console.error(e),
    });
  }

  setSelected(index: number) {
    this.selected = index;
    this.creating = false;
  }

  setCreating() {
    this.selected = undefined;
    this.creating = true;
  }
}
