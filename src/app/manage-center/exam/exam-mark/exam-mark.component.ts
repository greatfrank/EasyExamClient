import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../../backend.service";

@Component({
  selector: 'app-exam-mark',
  templateUrl: './exam-mark.component.html',
  styleUrls: ['./exam-mark.component.scss']
})
export class ExamMarkComponent implements OnInit {

  details = []
  classes = []
  courses = []
  groupedMenuList = []
  currentPaper = null

  constructor(
    private backendService: BackendService
  ) { }

  ngOnInit() {
    this.fetchAllStudentExamPapers()
  }

  fetchAllStudentExamPapers() {
    let self = this
    this.backendService.fetchAllByTableName('student_exam').subscribe(result => {
      self.details = result['response']
      self.backendService.fetchAllByTableName('courses').subscribe(result => {
        self.courses = result['response']
        self.backendService.fetchAllByTableName('classes').subscribe(result => {
          self.classes = result['response']
          for (let i = 0; i < self.details.length; i++) {
            const detail = self.details[i];
            let course_name = self.searchValueInObjArray('id', detail['course_id'], 'name', self.courses)
            if (course_name != null) {
              detail['course_name'] = course_name
            }
            let class_name = self.searchValueInObjArray('id', detail['class_id'], 'full_name', self.classes)
            if (course_name != null) {
              detail['class_name'] = class_name
            }
          }
          // console.log(self.details);
          this.groupAllDetails()
        })
      })
    })
  }

  groupAllDetails() {
    let self = this
    this.details.forEach(element => {
      self.groupedMenuList.push({
        course_id: element['course_id'],
        course_name: element['course_name']
      })
    })

    this.groupedMenuList = this.removeDuplicateObjects(this.groupedMenuList)

    for (let i = 0; i < this.groupedMenuList.length; i++) {
      const g = this.groupedMenuList[i];
      g['list'] = []
      for (let j = 0; j < self.details.length; j++) {
        let element = self.details[j];
        element['marked'] = false
        if (element['course_id'] == g['course_id']) {
          g['list'].push(element)
        }
      }
    }

    console.log(this.groupedMenuList);
  }

  selectPaper(courseIndex, paperIndex) {
    this.currentPaper = null
    this.currentPaper = this.groupedMenuList[courseIndex]['list'][paperIndex]
    if (typeof (this.currentPaper['paper']) == 'string') {
      this.currentPaper['paper'] = JSON.parse(this.currentPaper['paper'])
    }
    console.log(this.currentPaper);

  }



  /**
   * Tools function
   */
  removeDuplicateObjects(array: any[]) {
    return [...new Set(array.map(s => JSON.stringify(s)))]
      .map(s => JSON.parse(s));
  }

  searchValueInObjArray(searchKey, searchValue, resultKey, searchArray) {
    let result = null
    for (let i = 0; i < searchArray.length; i++) {
      const item = searchArray[i];
      if (item[searchKey] == searchValue) {
        result = item[resultKey]
        break
      } else {
        result = null
        continue
      }
    }
    return result
  }




}
