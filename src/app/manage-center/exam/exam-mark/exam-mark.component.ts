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
  classIndex = -1
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

  // 首先按照课程进行分组，然后再按照班级进行分组
  groupAllDetails() {
    let self = this
    console.log(this.details);
    this.groupedMenuList = this.utilityService.groupData(this.details, 'course_id', 'course_name', 'list')

    for (let i = 0; i < this.groupedMenuList.length; i++) {
      let classDetail = this.groupedMenuList[i]['list']
      this.groupedMenuList[i]['list'] = this.utilityService.groupData(classDetail, 'class_id', 'class_name', 'list')
    }
    console.log(this.groupedMenuList);
  }

  selectPaper(courseIndex, classIndex, paperIndex) {
    this.currentPaper = null
    this.invalidScore = false
    this.courseIndex = courseIndex
    this.classIndex = classIndex
    this.paperIndex = paperIndex
    this.currentPaper = this.groupedMenuList[courseIndex]['list'][classIndex]['list'][paperIndex]
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
    console.log(this.currentPaper);
    
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
    if (!confirm('确定完成阅卷吗？')) {
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
