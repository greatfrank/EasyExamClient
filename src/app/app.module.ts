import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FooterComponent } from './footer/footer.component';
import { SloganComponent } from './welcome/slogan/slogan.component';
import { FeaturesComponent } from './welcome/features/features.component';
import { SignComponent } from './welcome/sign/sign.component';
import { RegistComponent } from './regist/regist.component';
import { ManageCenterComponent } from './manage-center/manage-center.component';
import { MetadataComponent } from './manage-center/metadata/metadata.component';
import { StatisticComponent } from './manage-center/statistic/statistic.component';
import { QuestionBankComponent } from './manage-center/question-bank/question-bank.component';
import { TeacherProfileComponent } from './manage-center/teacher-profile/teacher-profile.component';
import { StudyCenterComponent } from './study-center/study-center.component';
import { StudentProfileComponent } from './study-center/student-profile/student-profile.component';
import { StudentExamComponent } from './study-center/student-exam/student-exam.component';

import { ConfirmDeactivateGuardService } from "./confirm-deactivate-guard.service";
import { QuestionToggleButtonsComponent } from './study-center/question-toggle-buttons/question-toggle-buttons.component';
import { SubmitExamSuccessComponent } from './study-center/submit-exam-success/submit-exam-success.component';
import { ExamDesignComponent } from './manage-center/exam/exam-design/exam-design.component';
import { ExamMarkComponent } from './manage-center/exam/exam-mark/exam-mark.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    FooterComponent,
    SloganComponent,
    FeaturesComponent,
    SignComponent,
    RegistComponent,
    ManageCenterComponent,
    MetadataComponent,
    StatisticComponent,
    QuestionBankComponent,
    ExamDesignComponent,
    TeacherProfileComponent,
    StudyCenterComponent,
    StudentProfileComponent,
    StudentExamComponent,
    QuestionToggleButtonsComponent,
    SubmitExamSuccessComponent,
    ExamDesignComponent,
    ExamMarkComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ConfirmDeactivateGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
