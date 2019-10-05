import { Injectable } from '@angular/core';
import { CanDeactivate } from "@angular/router";
import { StudentExamComponent } from "./study-center/student-exam/student-exam.component";

@Injectable({
  providedIn: 'root'
})
export class ConfirmDeactivateGuardService implements CanDeactivate<StudentExamComponent> {

  constructor() { }

  canDeactivate(target: StudentExamComponent) {
    return confirm("确定要离开此页面吗？ 如果没有【交卷】就离开此页面，该考试成绩将记为【0】分")
  }
}
