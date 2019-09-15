import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from "../app/welcome/welcome.component";
import { RegistComponent } from "../app/regist/regist.component";
const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'regist',
    component: RegistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
