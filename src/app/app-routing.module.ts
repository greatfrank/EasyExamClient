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
    component: StudyCenterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
