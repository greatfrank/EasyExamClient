import { Component, OnInit } from '@angular/core';
import { UtilityService } from "../../utility.service";
import { FormBuilder, Validators } from "@angular/forms";
import { BackendService } from "../../backend.service";
import { locale } from 'moment';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss'],
  providers: [UtilityService, BackendService]
})
export class TeacherProfileComponent implements OnInit {

  teacher: any
  inputKey = ''
  inputLabel = ''
  isSavingModify = false

  modifyForm = this.fb.group({
    newValue: ['', Validators.required]
  })

  constructor(
    private backService: BackendService,
    private utilityService: UtilityService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.utilityService.goToTop()
    this.setupTeacherInfo()
  }

  setupTeacherInfo() {
    let self = this
    this.backService.fetchAllByTableName('teachers').subscribe(result => {
      self.teacher = result['response'][0]
      sessionStorage.setItem('teacher', JSON.stringify(self.teacher))
    })
  }

  modifyProfileInfo(key, label) {
    this.inputLabel = label
    this.inputKey = key
  }

  saveModify() {
    let self = this

    this.isSavingModify = true

    if (this.modifyForm.get('newValue').value == this.teacher[this.inputKey]) {
      alert('抱歉，不建议保存相同的值')
      this.isSavingModify = false
      this.cancelModify()
      return
    }

    let body = {}
    body[this.inputKey] = this.modifyForm.get('newValue').value
    body['id'] = this.teacher['id']
    console.log(body);

    this.backService.updateByTableName('teachers', body).subscribe(result => {
      self.isSavingModify = false
      console.log(result);
      if (result['effect_rows'] == 1 && result['message'] == 'complete') {
        alert('修改成功 ！')
        location.reload()
      } else {
        alert('修改失败，请重试')
      }
      self.cancelModify()
    })

  }

  cancelModify() {
    this.modifyForm.reset()
    this.inputLabel = ''
  }

}
