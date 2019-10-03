import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalData } from "../../global/global-data";
import { BackendService } from "../../backend.service";

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
    questions: '[{"count": 10, "point": 2, "title": "选择题", "question": "choices"}, {"count": 10, "point": 2, "title": "填空题", "question": "fills"}, {"count": 10, "point": 2, "title": "判断题", "question": "judges"}, {"count": 5, "point": 8, "title": "简答题", "question": "short_answers"}]',
    state: "active",
    total: "100"
  }

  questionType = ''
  questionIndex = -1
  contentIndex = -1

  // ----------------
  // ----------------

  constructor(
    private router: Router,
    private backendService: BackendService,
  ) { }

  ngOnInit() {
    this.setupMyexam()
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
    let self = this
    this.myexam['questions'] = JSON.parse(this.myexam['questions'])

    let body = {
      course_id: this.myexam['course_id']
    }

    for (let i = 0; i < this.myexam['questions'].length; i++) {
      let questionObj = this.myexam['questions'][i]
      self.backendService.queryQuestionsByTableNameAndLimit(questionObj['question'], questionObj['count'], body).subscribe(result => {
        self.myexam['questions'][i]['contents'] = result['response']

        for (let j = 0; j < questionObj['contents'].length; j++) {
          // Reformat content json data struct
          let tempJson = JSON.parse(questionObj['contents'][j]['content']
          )
          Object.keys(tempJson).forEach(key => {
            questionObj['contents'][j][key] = tempJson[key]
          });
          delete questionObj['contents'][j]['content']
          // Add a feature "stu_answer" to every content object
          switch (questionObj['question']) {
            case 'choices':
              questionObj['contents'][j]['stu_answer'] = ''
              break
            case 'fills':
              const len = questionObj['contents'][j]['standard_answer'].length
              let arr = []
              for (let i = 0; i < len; i++) {
                arr.push('')
              }
              questionObj['contents'][j]['stu_answer'] = arr
              questionObj['contents'][j]['is_full'] = false
              break
            case 'judges':
              questionObj['contents'][j]['stu_answer'] = null
              break
          }
        }
      })
    }
    console.log(this.myexam);
  }

  toggleQuestion(questionType, questionIndex, contentIndex) {
    this.questionType = questionType
    this.questionIndex = questionIndex
    this.contentIndex = contentIndex
  }


  onChoiceGetAnswer(questionIndex: any, contentIndex: any, answer: any) {
    this.myexam['questions'][questionIndex]['contents'][contentIndex]['stu_answer'] = answer
  }

  onFillsGetAnswer(questionIndex, contentIndex, answerIndex, value) {
    this.myexam['questions'][questionIndex]['contents'][contentIndex]['stu_answer'][answerIndex] = value

    this.myexam['questions'][questionIndex]['contents'][contentIndex]['is_full'] = this.checkArrFull(this.myexam['questions'][questionIndex]['contents'][contentIndex]['stu_answer'])
  }

  onJudgesGetAnswer(questionIndex, contentIndex, value) {
    this.myexam['questions'][questionIndex]['contents'][contentIndex]['stu_answer'] = value
  }

  checkArrFull(arr: [any]) {
    let isFull = true
    for (let i = 0; i < arr.length; i++) {
      if (!arr[i]) {
        isFull = false
        break
      }
    }
    return isFull
  }


}
