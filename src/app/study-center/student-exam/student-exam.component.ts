import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalData } from "../../global/global-data";

@Component({
  selector: 'app-student-exam',
  templateUrl: './student-exam.component.html',
  styleUrls: ['./student-exam.component.scss']
})
export class StudentExamComponent implements OnInit {

  myexam = {
    class: { id: "16448", major: "计算机信息管理", num: "01", regist_year: "2017", type: "高职" },
    course_id: "1234",
    course_name: "Python程序设计",
    created_datetime: "2019-10-03 00:23:43",
    duration: "90",
    id: "1570033423",
    questions: '[{"count": 10, "point": 2, "title": "选择题", "question": "choices"}, {"count": 20, "point": 2, "title": "填空题", "question": "fills"}, {"count": 10, "point": 2, "title": "判断题", "question": "judges"}, {"count": 4, "point": 5, "title": "简答题", "question": "short_answers"}]',
    state: "active",
    total: "100"
  }


  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.setupMyexam()
    // this.checkStudentSelectedExam()
  }

  checkStudentSelectedExam() {
    if (!GlobalData.studentSelectedExam) {
      sessionStorage.removeItem('student')
      this.router.navigateByUrl('/')
    } else {
      console.log(GlobalData.studentSelectedExam);
      this.myexam = GlobalData.studentSelectedExam
      console.log(this.myexam);
    }
  }

  setupMyexam() {
    this.myexam['questions'] = JSON.parse(this.myexam['questions'])
    console.log(this.myexam);
    
  }

}
