import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { GlobalData } from 'src/app/global/global-data';
import { FormBuilder, Validators } from "@angular/forms";
import { BackendService } from "../../backend.service";
import { UtilityService } from "../../utility.service";
import { MessageService } from 'src/app/message.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

declare var $: any

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionBankComponent implements OnInit, OnDestroy {

  // 单选题
  choiceForm = this.fb.group({
    course_id: ['', Validators.required],
    question: ['', Validators.required],
    currentOption: [''],
    options: [[], (Validators.required, Validators.minLength(4), Validators.maxLength(4))],
    standard_answer: ['', Validators.required],
    explanation: ['']
  })
  isSubmitingChoice = false
  totalChoices = 0
  savedChoices = []
  choicesModalObj = {
    course_name: '',
    list: []
  }

  // 填空题
  fillForm = this.fb.group({
    course_id: ['', Validators.required],
    question: ['', Validators.required],
    currentAnswer: [''],
    standard_answer: [[], Validators.required],
    explanation: ['']
  })
  isSubmitingFill = false
  totalFills = 0
  savedFills = []
  fillsModalObj = {
    course_name: '',
    list: []
  }

  // 判断题
  judgeForm = this.fb.group({
    course_id: ['', Validators.required],
    question: ['', Validators.required],
    standard_answer: ['', Validators.required],
    explanation: ['']
  })
  isSubmitingJudge = false
  totalJudges = 0
  savedJudges = []
  judgesModalObj = {
    course_name: '',
    list: []
  }

  // 简答题
  shortAnswerForm = this.fb.group({
    course_id: ['', Validators.required],
    question: ['', Validators.required],
    standard_answer: ['', Validators.required],
    explanation: ['']
  })
  isSubmitingShortAnswer = false
  totalShortAnswers = 0
  savedShortAnswers = []
  shortAnswersModalObj = {
    course_name: '',
    list: []
  }

  // -------------------------------------------
  courses: any
  currentQuestionTitle: any
  subscription: Subscription
  // ------------------------------------------

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService,
    private utilityService: UtilityService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.subscription = this.messageService.getQuestionTitleMessage().subscribe(message => {
      this.locateById(message['title'])
    })
  }

  ngOnInit() {
    let self = this

    this.utilityService.goToTop()

    this.backendService.fetchAllByTableName('courses').subscribe(data => {
      self.courses = data['response']
    })

    this.fetchAllChoices()
    this.fetchAllFills()
    this.fetchAllJudges()
    this.fetchAllShortAnswers()

    let l = this.router.url.split('/').length
    this.locateById(this.router.url.split('/')[l - 1])

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  locateById(id: string) {
    let fromOffset = $('#' + id).offset()
    $('html, body').animate({
      scrollTop: fromOffset.top - 80
    })
  }

  goToTop() {
    this.utilityService.goToTop()
  }

  /**
   * =======================
   * Choice 单选题
   * =======================
  */
  addOptionForChoice() {
    let arr = this.choiceForm.get('options').value
    arr.push(this.choiceForm.get('currentOption').value)

    this.choiceForm.patchValue({
      options: arr
    })
    this.choiceForm.get('currentOption').reset()
  }

  standardAnswerChanged(option: any) {
    this.choiceForm.patchValue({
      standard_answer: option
    })
  }

  removeOptionForChoice(index) {
    let arr = this.choiceForm.get('options').value
    arr.splice(index, 1)
    this.choiceForm.patchValue({
      options: arr
    })
  }

  fetchAllChoices() {
    let self = this
    this.savedChoices = []
    self.backendService.fetchAllByTableName('choices').subscribe(data => {
      let arr = data['response']
      // Setup json data struct for original array
      let tempArr = []
      arr.forEach(element => {
        let json = JSON.parse(element['content'])
        json['course_id'] = element['course_id']
        json['course_name'] = self.transferCourseName(element['course_id'])
        json['id'] = element['id']
        tempArr.push(json)
      });
      self.totalChoices = tempArr.length
      self.savedChoices = self.utilityService.groupData(tempArr, 'course_id', 'course_name', 'list')
    })
  }

  onChoiceSubmit() {
    let self = this
    this.isSubmitingChoice = true
    let content = {
      question: this.utilityService.replaceAll(this.choiceForm.get('question').value, '\n', '<br>'),
      options: this.choiceForm.get('options').value,
      standard_answer: this.choiceForm.get('standard_answer').value,
      explanation: this.utilityService.replaceAll(this.choiceForm.get('explanation').value, '\n', '<br>')
    }
    let body = {
      id: this.utilityService.getIdByTimestamp(),
      course_id: this.choiceForm.get('course_id').value,
      content: JSON.stringify(content)
    }

    this.backendService.addNewByTableName('choices', body).subscribe(data => {
      self.isSubmitingChoice = false
      if (data['effect_rows'] == 1 && data['message'] == 'complete') {
        self.choiceForm.reset()
        self.choiceForm.patchValue({
          options: []
        })
        alert('提交成功')
        self.fetchAllChoices()
      } else {
        alert('提交失败，请重试')
      }
    })
  }

  /**
   * =======================
   * Fill 填空题
   * =======================
   */
  addAnswerForFill() {
    let arr = this.fillForm.get('standard_answer').value
    arr.push(this.fillForm.get('currentAnswer').value)
    this.fillForm.patchValue({
      standard_answer: arr
    })
    this.fillForm.get('currentAnswer').reset()
  }

  removeAnswerForFill(index) {
    let arr = this.fillForm.get('standard_answer').value
    arr.splice(index, 1)
    this.fillForm.patchValue({
      standard_answer: arr
    })
  }

  fetchAllFills() {
    let self = this
    this.savedFills = []
    self.backendService.fetchAllByTableName('fills').subscribe(data => {
      let arr = data['response']
      // Setup json data struct for original array
      let tempArr = []
      arr.forEach(element => {
        let json = JSON.parse(element['content'])
        json['course_id'] = element['course_id']
        json['course_name'] = self.transferCourseName(element['course_id'])
        json['id'] = element['id']
        tempArr.push(json)
      });
      self.totalFills = tempArr.length
      self.savedFills = self.utilityService.groupData(tempArr, 'course_id', 'course_name', 'list')
    })
  }

  onFillSubmit() {
    let self = this
    this.isSubmitingFill = true
    let content = {
      question: this.utilityService.replaceAll(this.fillForm.get('question').value, '\n', '<br>'),
      standard_answer: this.fillForm.get('standard_answer').value,
      explanation: this.utilityService.replaceAll(this.fillForm.get('explanation').value, '\n', '<br>')
    }
    let body = {
      id: this.utilityService.getIdByTimestamp(),
      course_id: this.fillForm.get('course_id').value,
      content: JSON.stringify(content)
    }
    this.backendService.addNewByTableName('fills', body).subscribe(data => {
      self.isSubmitingFill = false
      if (data['effect_rows'] == 1 && data['message'] == 'complete') {
        self.fillForm.reset()
        self.fillForm.patchValue({
          standard_answer: []
        })
        self.fetchAllFills()
        alert('提交成功')
      } else {
        alert('提交失败，请重试')
      }
    })
  }

  /**
   * =======================
   * Judge 判断题
   * =======================
   */

  onStandardAnswerChanged(value) {
    this.judgeForm.patchValue({
      standard_answer: value
    })
  }

  fetchAllJudges() {
    let self = this
    this.savedJudges = []
    self.backendService.fetchAllByTableName('judges').subscribe(data => {
      let arr = data['response']
      // Setup json data struct for original array
      let tempArr = []
      arr.forEach(element => {
        let json = JSON.parse(element['content'])
        json['course_id'] = element['course_id']
        json['course_name'] = self.transferCourseName(element['course_id'])
        json['id'] = element['id']
        tempArr.push(json)
      });
      self.totalJudges = tempArr.length
      self.savedJudges = self.utilityService.groupData(tempArr, 'course_id', 'course_name', 'list')
    })
  }

  onJudgeSubmit() {
    let self = this
    this.isSubmitingJudge = true
    let content = {
      question: this.utilityService.replaceAll(this.judgeForm.get('question').value, '\n', '<br>'),
      standard_answer: this.judgeForm.get('standard_answer').value,
      explanation: this.utilityService.replaceAll(this.judgeForm.get('explanation').value, '\n', '<br>')
    }
    let body = {
      id: this.utilityService.getIdByTimestamp(),
      course_id: this.judgeForm.get('course_id').value,
      content: JSON.stringify(content)
    }
    this.backendService.addNewByTableName('judges', body).subscribe(data => {
      self.isSubmitingJudge = false
      if (data['effect_rows'] == 1 && data['message'] == 'complete') {
        self.judgeForm.reset()
        self.fetchAllJudges()
        alert('提交成功')
      } else {
        alert('提交失败，请重试')
      }
    })
  }

  /**
   * =======================
   * Short Answer 简答题
   * =======================
   */
  fetchAllShortAnswers() {
    let self = this
    this.savedShortAnswers = []
    self.backendService.fetchAllByTableName('short_answers').subscribe(data => {
      let arr = data['response']
      // Setup json data struct for original array
      let tempArr = []
      arr.forEach(element => {
        let json = JSON.parse(element['content'])
        json['course_id'] = element['course_id']
        json['course_name'] = self.transferCourseName(element['course_id'])
        json['id'] = element['id']
        tempArr.push(json)
      });
      self.totalShortAnswers = tempArr.length
      self.savedShortAnswers = self.utilityService.groupData(tempArr, 'course_id', 'course_name', 'list')

    })
  }

  onShortAnswerSubmit() {
    let self = this
    this.isSubmitingShortAnswer = true
    let content = {
      question: this.utilityService.replaceAll(this.shortAnswerForm.get('question').value, '\n', '<br>'),
      standard_answer: this.utilityService.replaceAll(this.shortAnswerForm.get('standard_answer').value, '\n', '<br>'),
      explanation: this.utilityService.replaceAll(this.shortAnswerForm.get('explanation').value, '\n', '<br>')
    }
    let body = {
      id: this.utilityService.getIdByTimestamp(),
      course_id: this.shortAnswerForm.get('course_id').value,
      content: JSON.stringify(content)
    }
    this.backendService.addNewByTableName('short_answers', body).subscribe(data => {
      self.isSubmitingShortAnswer = false
      if (data['effect_rows'] == 1 && data['message'] == 'complete') {
        self.shortAnswerForm.reset()
        self.fetchAllShortAnswers()
        alert('提交成功')
      } else {
        alert('提交失败，请重试')
      }
    })
  }

  // -----------------------------------------------

  transferCourseName(id: string) {
    let self = this
    let courseName = ''
    this.courses.forEach(course => {
      if (id == course['id']) {
        courseName = course['name']
      }
    });
    return courseName
  }

  showQuestionsModal(questionType: string, courseName: string, list: any) {
    switch (questionType) {
      case 'choices':
        this.choicesModalObj.course_name = courseName
        this.choicesModalObj.list = list
        $('#' + questionType + 'Modal').modal('show')
        break;
      case 'fills':
        this.fillsModalObj.course_name = courseName
        this.fillsModalObj.list = list
        $('#' + questionType + 'Modal').modal('show')
        break;
      case 'judges':
        this.judgesModalObj.course_name = courseName
        this.judgesModalObj.list = list
        $('#' + questionType + 'Modal').modal('show')
        break;
      case 'shortAnswers':
        this.shortAnswersModalObj.course_name = courseName
        this.shortAnswersModalObj.list = list
        $('#' + questionType + 'Modal').modal('show')
        break;
    }
  }


}
