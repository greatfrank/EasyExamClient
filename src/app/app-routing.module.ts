import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from "../app/welcome/welcome.component";
import { RegistComponent } from "../app/regist/regist.component";
import { ManageCenterComponent } from './manage-center/manage-center.component';
import { StatisticComponent } from './manage-center/statistic/statistic.component';
import { MetadataComponent } from './manage-center/metadata/metadata.component';
import { QuestionBankComponent } from './manage-center/question-bank/question-bank.component';
import { ExamComponent } from './manage-center/exam/exam.component';
import { TeacherProfileComponent } from "./manage-center/teacher-profile/teacher-profile.component";
import { StudyCenterComponent } from "./study-center/study-center.component";
import { StudentProfileComponent } from "./study-center/student-profile/student-profile.component";
import { StudentExamComponent } from "./study-center/student-exam/student-exam.component";
import { SubmitExamSuccessComponent } from "./study-center/submit-exam-success/submit-exam-success.component";

import { ConfirmDeactivateGuardService } from "./confirm-deactivate-guard.service";

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'regist',
    component: RegistComponent
  },
  {
    path: 'manage-center',
    component: ManageCenterComponent,
    children: [
      {
        path: 'statistic',
        component: StatisticComponent
      },
      {
        path: 'question-bank/:question',
        component: QuestionBankComponent
      },
      {
        path: 'metadata',
        component: MetadataComponent
      },
      {
        path: 'exam',
        component: ExamComponent
      },
      {
        path: 'teacher-profile',
        component: TeacherProfileComponent
      }
    ]
  },
  {
    path: "study-center",
    component: StudyCenterComponent,
    children: [
      {
        path: 'student-profile',
        component: StudentProfileComponent
      },
      {
        path: 'student-exam',
        component: StudentExamComponent,
        // canDeactivate: [
        //   ConfirmDeactivateGuardService
        // ]
      },
      {
        path: 'submit-exam-success',
        component: SubmitExamSuccessComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
