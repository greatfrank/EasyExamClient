import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ChartModule, HIGHCHARTS_MODULES } from "angular-highcharts";
import exporting from 'highcharts/modules/exporting.src.js';
export function highchartsModules() {
    return [exporting]
}

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
import { ChoicesModalComponent } from './manage-center/question-bank/choices-modal/choices-modal.component';
import { FillsModalComponent } from './manage-center/question-bank/fills-modal/fills-modal.component';
import { JudgesModalComponent } from './manage-center/question-bank/judges-modal/judges-modal.component';
import { ShortAnswersModalComponent } from './manage-center/question-bank/short-answers-modal/short-answers-modal.component';
import { CodingsModalComponent } from './manage-center/question-bank/codings-modal/codings-modal.component';

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
    ChoicesModalComponent,
    FillsModalComponent,
    JudgesModalComponent,
    ShortAnswersModalComponent,
    CodingsModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ConfirmDeactivateGuardService,
    {
      provide:HIGHCHARTS_MODULES,
      useFactory:highchartsModules
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
