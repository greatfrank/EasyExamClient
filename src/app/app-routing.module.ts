import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from "../app/welcome/welcome.component";
import { RegistComponent } from "../app/regist/regist.component";
import { ManageCenterComponent } from './manage-center/manage-center.component';
const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'regist',
    component: RegistComponent
  }, {
    path: 'manage-center',
    component: ManageCenterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
