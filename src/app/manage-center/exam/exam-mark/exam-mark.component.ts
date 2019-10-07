import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../../backend.service";

@Component({
  selector: 'app-exam-mark',
  templateUrl: './exam-mark.component.html',
  styleUrls: ['./exam-mark.component.scss']
})
export class ExamMarkComponent implements OnInit {

  constructor(
    private backendService: BackendService
  ) { }

  ngOnInit() {
    this.fetchAllStudentExamPapers()
    this.fetchAllCourses()
  }

  fetchAllStudentExamPapers() {
    let self = this
    this.backendService.fetchAllByTableName('student_exam').subscribe(result => {
      console.log(result['response']);
    })
  }

  fetchAllCourses(){
    let self=this
    this.backendService.fetchAllByTableName('courses').subscribe(result=>{
      console.log(result);
      
    })
  }

}
