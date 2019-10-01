import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../backend.service";
import { UtilityService } from "../../utility.service";

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
  providers: [UtilityService, BackendService]
})
export class StudentProfileComponent implements OnInit {

  student: any
  classes = []
  exams = []

  constructor(
    private backendService: BackendService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    let self = this
    this.setupStudentProfile()
    setTimeout(() => {
      self.setupExamForStudent()
    }, 500);
  }

  fetchAllClasses(classId: string) {
    let self = this
    this.backendService.fetchAllByTableName('classes').subscribe(result => {
      self.classes = result['response']
      self.transferClass(self.classes, classId)
      console.log(self.student);
    })
  }

  setupExamForStudent() {
    let self = this
    this.backendService.fetchAllByTableName('exams').subscribe(result => {
      self.exams = result['response'].filter(element => {
        return element['state'] == 'unfinished'
      })
      self.exams = self.exams.filter(element => {
        let flag = false
        let classes = JSON.parse(element['classes'])
        for (let i = 0; i < classes.length; i++) {
          if (classes[i]['id'] == self.student['class_id']) {
            flag = true
            break
          }
        }
        return flag
      })
      console.log(self.exams);
      
    })
  }

  setupStudentProfile() {
    let self = this
    this.student = JSON.parse(sessionStorage.getItem('student'))
    this.fetchAllClasses(this.student['class_id'])
  }

  transferClass(classes: any, classId: string) {
    let self = this
    classes.forEach(element => {
      if (classId == element['id']) {
        self.student['class'] = element
      }
    });
  }

}
