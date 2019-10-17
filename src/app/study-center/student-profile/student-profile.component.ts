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

  isLogin = false
  student: any
  classes = []
  exams = []
  stu_exams = []
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
    this.isLogin = this.utilityService.checkStudentLogin()
    if (!this.isLogin) {
      this.router.navigateByUrl("/")
      return
    }
    this.setupStudentAndExam()
  }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@
  setupStudentAndExam() {
    let self = this
    this.isFetchingExams = true
    this.student = JSON.parse(sessionStorage.getItem('student'))
    this.backendService.fetchMultipleTables(['classes', 'exams', 'student_exam']).subscribe(result => {
      self.isFetchingExams = false
      // --- Setup student info by classes and sessionStorage ---
      self.classes = result[0]['response']
      self.transferClass(self.classes, self.student['class_id'])
      // --- Setup exams by stu_exams ---
      self.exams = result[1]['response']
      self.stu_exams = result[2]['response']
      this.handleExamForStudent()
    })
  }

  // 根据学生的class_id，从发布的考试信息中过滤掉没有这个班的考试信息
  handleExamForStudent() {
    if (this.exams.length == 0) {
      return
    }

    // 过滤掉未发布的考试信息。即没有发布的考试，学生不能进入考试
    this.exams = this.exams.filter(element => {
      return element['state'] == 'active'
    })

    // 过滤掉跟这个学生的班级不相关的考试信息
    this.exams = this.exams.filter(element => {
      let flag = false
      let classes = JSON.parse(element['classes'])
      for (let i = 0; i < classes.length; i++) {
        if (classes[i]['id'] == this.student['class_id']) {
          flag = true
          break
        }
      }
      return flag
    })

    // 因为当前的考试信息都是与这个班级相关的考试，所以可以去掉考试中涉及到的所有班级的信息，然后把当前的班级信息放入考试列表中。
    this.exams.forEach(element => {
      delete element['classes']
      element['class'] = this.student['class']
    });
    this.checkExamMarked()
  }

  // 检测某一门考试，这个学生是否已经交卷。对应着数据表中的记录的marked字段的值，1 表示已交卷，0 表示未交卷。
  checkExamMarked() {
    let self = this
    // 这里不考虑实际的试卷题目，去掉
    this.stu_exams.forEach(element => {
      delete element['paper']
    });

    for (let i = 0; i < this.exams.length; i++) {
      const exam = this.exams[i];
      for (let j = 0; j < this.stu_exams.length; j++) {
        const stu_exam = this.stu_exams[j];
        if (stu_exam['student_id'] == self.student['id'] && stu_exam['class_id'] == exam['class']['id'] && stu_exam['course_id'] == exam['course_id'] && stu_exam['exam_id'] == exam['id']) {
          exam['marked'] = true
          break
        } else {
          exam['marked'] = false
          continue
        }
      }
    }
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
    sessionStorage.setItem('exam', JSON.stringify(exam))
    let baseUrl = this.router.url.split('/')[1]
    this.router.navigateByUrl(baseUrl + '/student-exam')
  }



}
