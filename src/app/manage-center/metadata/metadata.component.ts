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
  sources = {
    classes: [],
    courses: []
  }

  usedClassIds = []
  usedCourseIds = []

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService,
    private utilityService: UtilityService
  ) { }

  setupNotice(objectName: string) {
    let noticeStr = `如果在${objectName}右侧没有出现删除按钮，说明该${objectName}已经被某个考试模板使用了。如果要删除，请先去【考试设计】页面删除该${objectName},然后再在这个页面删除${objectName}。`
    return noticeStr
  }

  ngOnInit() {
    let self = this

    this.utilityService.goToTop()

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
    this.fetchMetadatas()
    this.fetchAllExams()
  }

  fetchMetadatas() {
    let self = this
    this.sources = {
      classes: [],
      courses: []
    }
    Object.keys(this.sources).forEach(key => {
      self.backendService.fetchAllByTableName(key).subscribe(data => {
        self.sources[key] = data['response']
      })
    })
  }


  fetchAllExams() {
    let self = this
    let savedExams = []
    this.backendService.fetchAllByTableName('exams').subscribe(result => {
      savedExams = result['response']
      savedExams.forEach(exam => {
        exam['classes'] = JSON.parse(exam['classes'])
      });
      savedExams.forEach(element => {
        // All used courses in exam-design
        self.usedCourseIds.push(element['course_id'])
        // All used classes in exam-design
        for (let i = 0; i < element['classes'].length; i++) {
          self.usedClassIds.push(element['classes'][i]['id'])
        }
      })
    })
  }

  detectCanRemovable(classId: any, courseId: any) {
    let removable = true
    if (classId && !courseId) {
      for (let i = 0; i < this.usedClassIds.length; i++) {
        const id = this.usedClassIds[i];
        if (classId == id) {
          removable = false
          break
        } else {
          removable = true
          continue
        }
      }
      return removable
    }
    if (!classId && courseId) {
      for (let i = 0; i < this.usedCourseIds.length; i++) {
        const id = this.usedCourseIds[i];
        if (courseId == id) {
          removable = false
          break
        } else {
          removable = true
          continue
        }
      }
      return removable
    }
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
          if (data['effect_rows'] == 1 && data['message'] == 'complete') {
            alert('添加成功')
            self.classForm.reset()
            self.isSubmitingClass = false
            self.fetchMetadatas()
          }
        })
        break
      case 'courses':
        this.isSubmitingCourse = true
        this.courseForm.patchValue({
          id: this.utilityService.getIdByTimestamp()
        })
        this.backendService.addNewByTableName(tableName, this.courseForm.value).subscribe(data => {
          if (data['effect_rows'] == 1 && data['message'] == 'complete') {
            alert('添加成功')
            self.courseForm.reset()
            self.isSubmitingCourse = false
            self.fetchMetadatas()
          }
        })
        break
      case 'exams':
        break
      default:
        break
    }
  }

  removeItemById(obj: any, id: any) {
    if (!confirm('确定要删除吗？')) {
      return
    }
    let self = this
    let body = {
      id: id
    }
    this.backendService.removeByTableName(obj, body).subscribe(result => {
      if (result['effect_rows'] == 1 && result['message'] == 'complete') {
        alert('删除成功')
        self.fetchMetadatas()
      } else {
        alert('删除失败，请重试')
      }
    })
  }


}
