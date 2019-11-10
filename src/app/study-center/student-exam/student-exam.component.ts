import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from "@angular/router";
import { GlobalData } from "../../global/global-data";
import { BackendService } from "../../backend.service";
import { UtilityService } from "../../utility.service";
import { QuestionToggleButtonsComponent } from "../question-toggle-buttons/question-toggle-buttons.component";
import * as moment from 'moment'

@Component({
  selector: 'app-student-exam',
  templateUrl: './student-exam.component.html',
  styleUrls: ['./student-exam.component.scss']
})
export class StudentExamComponent implements OnInit {

  isLogin = false

  myexam: any

  questionType = ''
  questionIndex = -1
  contentIndex = -1

  isFetchingAllQuestions = false

  // ----------------
  totalDuration = 0
  displayTotalDuration = ''
  // ----------------

  constructor(
    private router: Router,
    private backendService: BackendService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.utilityService.goToTop()
    this.isLogin = this.utilityService.checkStudentLogin()
    if (this.isLogin) {
      this.initMyExam()
    } else {
      alert("这位同学，请先登录")
      this.router.navigateByUrl("/")
      return
    }
  }

  initMyExam() {
    this.myexam = JSON.parse(sessionStorage.getItem('exam'))
    this.setupMyexam()
  }

  // 组织试卷结构，生成试卷的实际内容
  setupMyexam() {
    let self = this
    this.isFetchingAllQuestions = true
    this.myexam['questions'] = JSON.parse(this.myexam['questions'])

    let body = {
      course_id: this.myexam['course_id']
    }

    // 为了将所有的题型都抽到，这里定义了一个请求题型的数组
    let arr = []
    let questionLength = this.myexam['questions'].length
    for (let i = 0; i < questionLength; i++) {
      let questionObj = this.myexam['questions'][i]
      arr.push({
        tableName: questionObj['question'],
        limit: questionObj['count'],
        obj: body
      })
    }
    this.backendService.queryQuestionsRandom(arr).subscribe(result => {
      this.isFetchingAllQuestions = false
      for (let i = 0; i < questionLength; i++) {
        self.myexam['questions'][i]['contents'] = result[i]['response']
        let questionObj = self.myexam['questions'][i]
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
      }
    })

    this.myexam['total_score'] = 0
    this.setupTime()

  }

  // 设置时间，开始倒计时
  setupTime() {
    let self = this
    this.totalDuration = parseInt(this.myexam.duration)
    let allSeconds = this.totalDuration * 60
    this.displayTotalDuration = this.totalDuration + ' 分钟'
    // 每分钟计算剩余的时间
    let durationInterval = setInterval(() => {
      if (allSeconds == 0) {
        clearInterval(durationInterval)
        self.finishExam()
        // MISSION: submit paper
      }

      --allSeconds
      let minute = parseInt(String(allSeconds / 60))
      let second = allSeconds % 60
      self.displayTotalDuration = minute + ' 分 ' + second + ' 秒'
    }, 1000)
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
  }

  submitExamPaper() {
    if (confirm("确定要交卷吗？ 【交卷后将无法再次考试】")) {
      this.finishExam()
    } else {
    }
  }

  // 交卷 并 结束考试
  finishExam() {
    let self = this
    this.myexam['total_score'] = 0
    for (let i = 0; i < this.myexam['questions'].length; i++) {
      let question = this.myexam['questions'][i]
      for (let j = 0; j < question['contents'].length; j++) {
        const content = question['contents'][j];
        if (content['score'] == -1) {
          content['score'] = 0
        }
        this.myexam['total_score'] += content['score']
      }
    }

    // marked = '1' 表示学生已经提交了试卷
    let body = {
      id: this.utilityService.getIdByTimestamp(),
      student_id: JSON.parse(sessionStorage.getItem('student'))['id'],
      student_name: JSON.parse(sessionStorage.getItem('student'))['username'],
      class_id: this.myexam['class']['id'],
      course_id: this.myexam['course_id'],
      exam_id: this.myexam['id'],
      paper: JSON.stringify(this.myexam['questions']),
      score: this.myexam['total_score'],
      marked: '1',
      submit_datetime: moment().format('YYYY-MM-DD hh:mm:ss')
    }

    this.backendService.addNewByTableName('student_exam', body).subscribe(result => {
      if (result['effect_rows'] == 1 && result['message'] == 'complete') {
        let json = {
          course_id: self.myexam['course_id'],
          course_name: self.myexam['course_name'],
          student_name: JSON.parse(sessionStorage.getItem('student'))['username']
        }
        self.router.navigate(['/study-center/submit-exam-success', json])
      } else {
        alert('交卷失败，请重试。')
      }
    })

  }


}
