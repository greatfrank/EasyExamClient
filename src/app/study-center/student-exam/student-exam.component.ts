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
    // this.checkStudentSelectedExam()
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
          /**
           * Reformat content json data struct
           */
          let tempJson = JSON.parse(questionObj['contents'][j]['content']
          )
          Object.keys(tempJson).forEach(key => {
            questionObj['contents'][j][key] = tempJson[key]
          });
          /**
           * 给每一道题预设一个得分。默认为 -1 分，表示还没有判分。
           * 有些题型，比如单选、判断、填空，可以由程序自动判分，在方法 onChoicesGetAnswer, onFillsGetAnswer, onJudgesGetAnswer 里就可以完成判分。有些题型，比如 short_answer 和 codings，后期由可能需要借助 AI来完成，或者通过教师人工判分。
           */
          questionObj['contents'][j]['score'] = -1
          delete questionObj['contents'][j]['content']
          // Add a feature "stu_answer" to every content object
          switch (questionObj['question']) {
            case 'choices':
              questionObj['contents'][j]['stu_answer'] = null
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
            case 'short_answers':
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

  onChoiceGetAnswer(questionIndex, contentIndex, value) {
    this.myexam['questions'][questionIndex]['contents'][contentIndex]['stu_answer'] = value
    this.giveScoreToQuestion(questionIndex, contentIndex, value)
  }

  onFillsGetAnswer(questionIndex, contentIndex, answerIndex, value) {
    this.myexam['questions'][questionIndex]['contents'][contentIndex]['stu_answer'][answerIndex] = value.trim()

    this.myexam['questions'][questionIndex]['contents'][contentIndex]['is_full'] = this.checkArrFull(this.myexam['questions'][questionIndex]['contents'][contentIndex]['stu_answer'])

    let stu_answer = this.myexam['questions'][questionIndex]['contents'][contentIndex]['stu_answer']
    this.giveScoreToQuestion(questionIndex, contentIndex, stu_answer)
  }

  onJudgesGetAnswer(questionIndex, contentIndex, value) {
    this.myexam['questions'][questionIndex]['contents'][contentIndex]['stu_answer'] = value
    this.giveScoreToQuestion(questionIndex, contentIndex, value)
  }

  onShortAnswersGetAnswer(questionIndex, contentIndex, value) {
    this.myexam['questions'][questionIndex]['contents'][contentIndex]['stu_answer'] = value.trim()
  }

  // 判决数组中是否每个元素是否为空
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

  // 根据考生的答案、标准答案，给这道题得分
  giveScoreToQuestion(questionIndex, contentIndex, stu_answer): void {
    // 得到该题的分值
    let point = this.myexam['questions'][questionIndex]['point']
    // 得到该题目的标准答案
    let standard_answer = this.myexam['questions'][questionIndex]['contents'][contentIndex]['standard_answer']
    // 根据学生的答案和标准答案，给这道题判分
    this.myexam['questions'][questionIndex]['contents'][contentIndex]['score'] = (stu_answer.toString() == standard_answer.toString()) ? point : 0

    console.log(this.myexam);

  }


}
