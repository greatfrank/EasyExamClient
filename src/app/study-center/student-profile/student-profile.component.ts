import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";
import { BackendService } from "../../backend.service";
import { UtilityService } from "../../utility.service";
import { GlobalData } from 'src/app/global/global-data';
declare var $: any

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
  isFetchingExams = false

  examNotice = [
    '系统将会按照此项考试的设置，为学生自动、随机抽取考题，并生成试卷',
    '为防止作弊，考生的试卷一旦生成，则无法更换。即使取消后再次开始考试，试卷仍然为上一次得到的试卷。',
    '考试正式开始后，系统会立刻开始倒计时。倒计时结束，学生将无法再继续答题，而且考卷会自动提交',
    '考试过程中，考生已经做过的题目答案将会被系统缓存。所以如果离开或关闭考试的页面，下次再次开始答题，题目的答案将会从缓存中读取出来。但是考试的时间将会从离开考试页面的时间开始倒计时。',
    '考生的试卷提交后，等待片刻，系统会自动计算考生的成绩。',
  ]

  constructor(
    private router: Router,
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
      // console.log(self.student);
    })
  }

  setupExamForStudent() {
    let self = this
    this.isFetchingExams = true
    this.backendService.fetchAllByTableName('exams').subscribe(result => {
      self.isFetchingExams = false
      self.exams = result['response'].length
      if (self.exams.length == 0) {
        return
      }

      self.exams = result['response'].filter(element => {
        return element['state'] == 'active'
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
      self.exams.forEach(element => {
        delete element['classes']
        element['class'] = self.student['class']
      });

      self.checkExamSubmited()

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

  startExam(exam) {
    GlobalData.studentSelectedExam = exam
    let baseUrl = this.router.url.split('/')[1]
    this.router.navigateByUrl(baseUrl + '/student-exam')
  }

  checkExamSubmited() {
    let self = this
    this.backendService.fetchAllByTableName('student_exam', null).subscribe(result => {
      let arr = result['response']
      arr.forEach(element => {
        delete element['paper']
      });
      console.log(arr);
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        for (let j = 0; j < self.exams.length; j++) {
          const exam = self.exams[j];
          exam['submit'] = item['exam_id'] == exam['id'] ? true : false
        }
      }
    })
  }

}
