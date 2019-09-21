import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Course } from 'src/app/model/course';
import { BackendService } from "../../backend.service";
import { UtilityService } from "../../utility.service";
import { Class } from 'src/app/model/class';
import { GlobalData } from 'src/app/global/global-data';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss'],
  providers: [BackendService, UtilityService]
})
export class MetadataComponent implements OnInit {

  // for select menus init data
  majors = [
    '计算机应用技术',
    '大数据与安全',
    '计算机信息管理',
  ]
  registYears = []
  classNums = []


  // form model
  classForm = this.fb.group({
    id: [''],
    major: ['', Validators.required],
    type: ['', Validators.required],
    regist_year: ['', Validators.required],
    num: ['', Validators.required],
  })
  classesTableHeads = Object.keys(this.classForm.value)
  class = new Class()
  isSubmitingClass = false

  courseForm = this.fb.group({
    id: [''], // int(11)
    name: ['', Validators.required],
    credit: ['', Validators.required] // int(11)
  })
  course = new Course()
  isSubmitingCourse = false

  // sources for list
  sources:any

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    let self = this
    for (let index = 2014; index < 2030; index++) {
      this.registYears.push(index)
    }

    for (let index = 1; index <= 10; index++) {
      let num = String(index)
      if (num.length == 1) {
        num = '0' + num
      }
      this.classNums.push(num)
    }

    console.log(GlobalData.globalSources);
    this.sources = GlobalData.globalSources
  }


  onSubmit(tableName: string): void {
    let self = this
    switch (tableName) {
      case 'classes':
        this.isSubmitingClass = true
        this.classForm.patchValue({
          id: this.utilityService.getIdByTimestamp()
        })
        this.backendService.addNewByTableName(tableName, this.classForm.value).subscribe(data => {
          console.log(data);
          if (data['effect_rows'] == 1 && data['message'] == 'complete') {
            alert('添加成功')
            self.classForm.reset()
            self.isSubmitingClass = false
          }
        })
        break
      case 'courses':
        this.isSubmitingCourse = true
        this.courseForm.patchValue({
          id: this.utilityService.getIdByTimestamp()
        })
        this.backendService.addNewByTableName(tableName, this.courseForm.value).subscribe(data => {
          console.log(data);
          if (data['effect_rows'] == 1 && data['message'] == 'complete') {
            alert('添加成功')
            self.courseForm.reset()
            self.isSubmitingCourse = false
          }
        })
        break
      case 'exams':
        break
      default:
        break
    }
  }


}
