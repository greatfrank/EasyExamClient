import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../../backend.service";
import { GlobalData } from "../../../global/global-data";

@Component({
  selector: 'app-exam-mark',
  templateUrl: './exam-mark.component.html',
  styleUrls: ['./exam-mark.component.scss']
})
export class ExamMarkComponent implements OnInit {

  details = []
  classes = []
  courses = []

  constructor(
    private backendService: BackendService
  ) { }

  ngOnInit() {
    this.fetchAllStudentExamPapers()
  }

  fetchAllStudentExamPapers() {
    let self = this
    this.backendService.fetchAllByTableName('student_exam').subscribe(result => {
      self.details = result['response']
      console.log(self.details);
      self.backendService.fetchAllByTableName('courses').subscribe(result => {
        self.courses = result['response']
        console.log(self.courses);
        self.backendService.fetchAllByTableName('classes').subscribe(result => {
          self.classes = result['response']
          for (let i = 0; i < self.classes.length; i++) {
            const element = self.classes[i];
            element['full_name'] = element['type'] + element['major'] + element['regist_year'] + '-' + element['num']
          }
          console.log(self.classes);
          for (let i = 0; i < self.details.length; i++) {
            const detail = self.details[i];
            let course_name = self.searchValueInObjArray('id', detail['course_id'], 'name', self.courses)
            if (course_name != null) {
              detail['course_name'] = course_name
            }
            let class_name = self.searchValueInObjArray('id', detail['class_id'], 'full_name', self.classes)
            if (course_name != null) {
              detail['class_name'] = class_name
            }
          }
          console.log(self.details);

        })
      })
    })
  }


  searchValueInObjArray(searchKey, searchValue, resultKey, searchArray) {
    let result = null
    for (let i = 0; i < searchArray.length; i++) {
      const item = searchArray[i];
      if (item[searchKey] == searchValue) {
        result = item[resultKey]
        break
      } else {
        result = null
        continue
      }
    }
    return result
  }




}
