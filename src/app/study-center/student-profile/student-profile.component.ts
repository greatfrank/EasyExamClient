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

      // 过滤掉未发布的考试信息。即没有发布的考试，学生不能进入考试
      self.exams = result['response'].filter(element => {
        return element['state'] == 'active'
      })
      // 过滤掉给这个学生的班级不相关的考试信息
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
      // 因为当前的考试信息都是与这个班级相关的考试，所以可以去掉考试中涉及到的所有班级的信息，然后把当前的班级信息放入考试列表中。
      self.exams.forEach(element => {
        delete element['classes']
        element['class'] = self.student['class']
      });

      self.checkExamSubmited()

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
    this.backendService.fetchAllByTableName('student_exam').subscribe(result => {
      // 得到所有的学生交卷的情况记录
      let stu_exams = result['response']
      // 这里不考虑实际的试卷题目，去掉
      stu_exams.forEach(element => {
        delete element['paper']
      });

      // 遍历与这位学生相关的考试信息
      for (let i = 0; i < self.exams.length; i++) {
        let myexam = self.exams[i];
        let submit = false
        // 拿着一个考试信息，去遍历所有交卷信息
        for (let j = 0; j < stu_exams.length; j++) {
          const stu_exam = stu_exams[j];
          // 如果再交卷信息里，有这个学生的班级ID和考试信息，说明该学生已经完成了这门考试，并交卷。
          if (stu_exam['exam_id'] == myexam['id'] && stu_exam['class_id'] == myexam['class']['id']) {
            // 则设定这位学生的这门考试的状态为【已交卷】
            submit = true
            break
          } else {
            // 否则设定这门考试的状态为【未交卷】，继续比对下一个交卷信息
            submit = false
            continue
          }
        }
        // 把最后判断出来的交卷状态设定到当前的这门考试对象里
        myexam['submit'] = submit
      }
    })
  }

}
