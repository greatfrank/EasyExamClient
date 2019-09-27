import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../backend.service";
import { FormBuilder, Validators } from "@angular/forms";
import { GlobalData } from "../../global/global-data";
import { UtilityService } from "../../utility.service";

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
  providers: [UtilityService]
})
export class ExamComponent implements OnInit {

  courses: any

  questions = GlobalData.questions

  examForm = this.fb.group({
    course_id: ['', Validators.required],
    duration: ['90', Validators.required],
    total: ['100', Validators.required],
    paper: [[], Validators.required]
  })

  questionForm = this.fb.group({
    question: ['', Validators.required],
    title: [''],
    count: ['', Validators.required],
    point: ['', Validators.required]
  })
  currentTotalQuestionsPoints = 0

  constructor(
    private fb: FormBuilder,
    private utilityService: UtilityService,
    private backendService: BackendService,
  ) {
    let self = this
    this.backendService.fetchAllByTableName('courses').subscribe(data => {
      self.courses = data['response']
    })
  }

  ngOnInit() {
    this.utilityService.goToTop()
  }

  onAddQuestionSubmit() {
    let self = this
    // 拆分字符串 e.g. choices@选择题
    let qq = this.questionForm.get('question').value.toString()
    this.questionForm.patchValue({
      question: qq.split('@')[0],
      title: qq.split('@')[1]
    })

    let tempQuestions = this.examForm.get('paper').value
    tempQuestions.push(this.questionForm.value)
    this.examForm.patchValue({
      paper: tempQuestions
    })
    // comput all question points
    this.computCurrentTotalPoints()
    this.questionForm.reset()
  }

  onRemoveQuestion(questionObj: any) {
    let self = this
    console.log(self.examForm.get('paper').value)
    this.examForm.get('paper').value.forEach((element, index) => {
      if (element['question'] == questionObj['question']) {
        self.examForm.get('paper').value.splice(index, 1)
        self.computCurrentTotalPoints()
        console.log(self.examForm.get('paper').value)
      }
    });
  }

  computCurrentTotalPoints() {
    let self = this
    this.currentTotalQuestionsPoints = 0
    this.examForm.get('paper').value.forEach(element => {
      self.currentTotalQuestionsPoints += element['count'] * element['point']
    });
  }

  onExamFormSubmit() {
    console.log('===============');
    console.log(this.examForm.value);
    console.log('===============');

  }

}
