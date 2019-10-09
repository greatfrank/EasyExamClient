import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../../backend.service";
import { UtilityService } from "../../../utility.service";

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
  courseIndex = -1
  paperIndex = -1
  currentPaper = null

  invalidScore = false

  constructor(
    private utilityService: UtilityService,
    private backendService: BackendService
  ) { }

  ngOnInit() {
    this.utilityService.goToTop()
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
        if (element['course_id'] == g['course_id']) {
          g['list'].push(element)
        }
      }
    }
  }

  selectPaper(courseIndex, paperIndex) {
    this.currentPaper = null
    this.invalidScore = false
    this.courseIndex = courseIndex
    this.paperIndex = paperIndex
    this.currentPaper = this.groupedMenuList[courseIndex]['list'][paperIndex]
    if (typeof (this.currentPaper['paper']) == 'string') {
      this.currentPaper['paper'] = JSON.parse(this.currentPaper['paper'])
    }

    for (let i = 0; i < this.currentPaper['paper'].length; i++) {
      const content = this.currentPaper['paper'][i];
      if (content['question'] == 'choices' || content['question'] == 'fills' || content['question'] == 'judges') {
        for (let j = 0; j < content['contents'].length; j++) {
          const q = content['contents'][j];
          if (String(q['standard_answer']) == String(q['stu_answer'])) {
            q['score'] = content['point']
          }
        }
      }
    }
  }

  checkInvalidScore() {
    for (let i = 0; i < this.currentPaper['paper'].length; i++) {
      const p = this.currentPaper['paper'][i]
      const contents = p['contents'];
      for (let j = 0; j < contents.length; j++) {
        const content = contents[j];
        if (content['score'] <= p['point'] && typeof (content['score']) == 'number') {
          this.invalidScore = false
          continue
        } else {
          this.invalidScore = true
          break
        }
      }
      if (this.invalidScore) {
        break
      } else {
        continue
      }
    }
  }

  finishMarkPaper() {
    if (!confirm('确定完成阅卷吗？ 一旦确定，则该试卷的分值无法修改。')) {
      return
    }
    let self = this
    this.currentPaper['marked'] = '1'
    let totalScore = 0

    for (let i = 0; i < this.currentPaper['paper'].length; i++) {
      const questionObj = this.currentPaper['paper'][i];
      for (let j = 0; j < questionObj['contents'].length; j++) {
        const content = questionObj['contents'][j];
        totalScore += content['score']
      }
    }
    this.currentPaper['score'] = totalScore

    let body = {
      id: this.currentPaper['id'],
      paper: JSON.stringify(this.currentPaper['paper']),
      score: totalScore,
      marked: this.currentPaper['marked']
    }

    this.backendService.updateByTableName('student_exam', body).subscribe(result => {
      if (result['effect_rows'] == 1 && result['message'] == 'complete') {
        alert('成绩提交完成')
        self.currentPaper = null
        self.utilityService.goToTop()
      }

    })

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
