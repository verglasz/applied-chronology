import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgMaterialModule } from './ng-material/ng-material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ApplicationListComponent } from './components/application-list/application-list.component';
import { InterviewListComponent } from './components/interview-list/interview-list.component';
import { ApplicationDetailsComponent } from './components/application-details/application-details.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginStateComponent } from './components/login-state/login-state.component';
import { NewApplicationComponent } from './components/new-application/new-application.component';
import { NewInterviewComponent } from './components/new-interview/new-interview.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignupFormComponent,
    ApplicationListComponent,
    InterviewListComponent,
    ApplicationDetailsComponent,
    LoginStateComponent,
    NewApplicationComponent,
    NewInterviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
