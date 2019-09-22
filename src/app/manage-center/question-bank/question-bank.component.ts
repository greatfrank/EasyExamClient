import { Component, OnInit } from '@angular/core';
import { NgModel, MaxLengthValidator } from "@angular/forms";
import { GlobalData } from 'src/app/global/global-data';
import { FormBuilder, Validators } from "@angular/forms";
import { BackendService } from "../../backend.service";
import { UtilityService } from "../../utility.service";
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.scss']
})
export class QuestionBankComponent implements OnInit {

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
  isFetchingChoices = false
  totalChoices = 0
  savedChoices = []

  // 填空题
  fillForm = this.fb.group({
    course_id: ['', Validators.required],
    question: ['', Validators.required],
    currentAnswer: [''],
    standard_answer: [[], Validators.required],
    explanation: ['']
  })
  isSubmitingFill = false
  isFetchingFills = false
  savedFills = []

  // 判断题
  judgeForm = this.fb.group({
    course_id: ['', Validators.required],
    question: ['', Validators.required],
    standard_answer: ['', Validators.required],
    explanation: ['']
  })
  isSubmitingJudge = false
  isFetchingJudges = false
  savedJudges = []

  // 简答题
  shortAnswerForm = this.fb.group({
    course_id: ['', Validators.required],
    question: ['', Validators.required],
    standard_answer: ['', Validators.required],
    explanation: ['']
  })
  isSubmitingShortAnswer = false
  isFetchingShortAnswers = false
  savedShortAnswers = []


  sources: any

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.sources = GlobalData.globalSources

    this.fetchAllChoices()


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

  onChoiceSubmit() {
    let self = this

    this.isSubmitingChoice = true

    let content = {
      question: this.choiceForm.get('question').value,
      options: this.choiceForm.get('options').value,
      standard_answer: this.choiceForm.get('standard_answer').value,
      explanation: this.choiceForm.get('explanation').value
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

  onFillSubmit() {
    let self = this
    this.isSubmitingFill = true
    let content = {
      question: this.fillForm.get('question').value,
      standard_answer: this.fillForm.get('standard_answer').value,
      explanation: this.fillForm.get('explanation').value
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

  onJudgeSubmit() {
    let self = this
    this.isSubmitingJudge = true
    let content = {
      question: this.judgeForm.get('question').value,
      standard_answer: this.judgeForm.get('standard_answer').value,
      explanation: this.judgeForm.get('explanation').value
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
  onShortAnswerSubmit() {
    let self = this
    this.isSubmitingShortAnswer = true
    let content = {
      question: this.shortAnswerForm.get('question').value,
      standard_answer: this.shortAnswerForm.get('standard_answer').value,
      explanation: this.shortAnswerForm.get('explanation').value
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
        alert('提交成功')
      } else {
        alert('提交失败，请重试')
      }
    })
  }

  transferCourseName(id: string) {
    let self = this
    let courseName = ''
    let courses = GlobalData.globalSources['courses']
    // console.log(courses);
    courses.forEach(course => {
      if (id == course['id']) {
        courseName = course['name']
      }
    });
    return courseName
  }

  groupCourseByName(courseArr: any[]) {
    let resultArr = []

    // Sort original array
    var compareFun = function (emp1: any, emp2: any) {
      if (emp1['course_id'] > emp2['course_id']) {
        return -1
      }
      if (emp1['course_id'] < emp2['course_id']) {
        return 1
      }
      return 0
    }
    let sortedCourseArr = courseArr.sort(compareFun)
    console.log(sortedCourseArr);

    // Set group array
    let nameSet = new Set()
    courseArr.forEach(element => {
      nameSet.add(element['course_name'])
    });
    for (const name of nameSet) {
      let subArr = []
      sortedCourseArr.forEach(course => {
        if (course['course_name'] == name) {
          subArr.push(course)
        }
      });
      resultArr.push({
        course_name: name,
        list: subArr
      })
    }

    console.log(resultArr);
    return resultArr

  }

  /**
   * Fetch data from remote server
   */
  fetchAllChoices() {
    let self = this

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
      this.savedChoices = this.groupCourseByName(tempArr)
      console.log(this.savedChoices);
    })
  }

}
