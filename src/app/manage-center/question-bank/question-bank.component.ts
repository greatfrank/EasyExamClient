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

  // 填空题
  fillForm = this.fb.group({
    course_id: ['', Validators.required],
    question: ['', Validators.required],
    currentAnswer: [''],
    standard_answer: [[], Validators.required],
    explanation: ['']
  })
  isSubmitingFill = false


  sources: any

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.sources = GlobalData.globalSources
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
    /**
     * {
  "question":"题干",
  "standard_answer":["a1","a2"],
  "explanation":""  
}
     */

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

}
