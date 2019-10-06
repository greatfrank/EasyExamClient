import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../../backend.service";
import { FormBuilder, Validators } from "@angular/forms";
import { GlobalData } from "../../../global/global-data";
import { UtilityService } from "../../../utility.service";


@Component({
  selector: 'app-exam-design',
  templateUrl: './exam-design.component.html',
  styleUrls: ['./exam-design.component.scss']
})
export class ExamDesignComponent implements OnInit {

  courses: any

  questions = GlobalData.questions

  examForm = this.fb.group({
    id: [''],
    course_id: ['', Validators.required],
    course_name: [''],
    classes: [[]],
    duration: ['90', Validators.required],
    total: ['100', Validators.required],
    questions: [[], Validators.required],
    created_datetime: ['']
  })
  isSubmitingExam = false
  savedExams = []

  questionForm = this.fb.group({
    question: ['', Validators.required],
    title: [''],
    count: ['', Validators.required],
    point: ['', Validators.required]
  })
  currentTotalQuestionsPoints = 0

  selectedClassForm = this.fb.group({
    class_id: ['', Validators.required]
  })
  savedClasses = []

  isUpdatingClassesForExam = false

  activeLength = 0
  inactiveLength = 0

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
    this.fetchAllSavedExams()
    this.fetchAllSavedClasses()
  }

  fetchAllSavedClasses() {
    let self = this
    this.savedExams = []
    this.backendService.fetchAllByTableName('classes').subscribe(result => {
      self.savedClasses = result['response']
    })
  }

  addClassToExam(exam) {
    let self = this
    let class_id = this.selectedClassForm.get('class_id').value

    let selectedClasses = exam['classes']
    let willAddedClass: any
    let canAddNewClass = true


    // 根据选择到的 class_id, 从全部的班级信息里找到选择的班级的完整信息
    this.savedClasses.forEach(element => {
      if (element['id'] == class_id) {
        willAddedClass = element
      }
    })

    // 检索现在已经添加到考试中的班级数组，如果重复添加，则不允许
    for (let i = 0; i < selectedClasses.length; i++) {
      const element = selectedClasses[i];
      if (element['id'] == willAddedClass['id']) {
        canAddNewClass = false
        break
      } else {
        canAddNewClass = true
        continue
      }
    }

    // 如果没有重复，则允许添加
    if (canAddNewClass) {
      selectedClasses.push(willAddedClass)
    }

    this.selectedClassForm.reset()
    console.log(this.savedExams);

  }

  removeClass(currentClass: any, exam) {
    exam['classes'].forEach((element, index) => {
      if (element['id'] == currentClass['id']) {
        exam['classes'].splice(index, 1)
      }
    });
  }

  /**
   * ===================================
   * exam 对象中的state属性有三个状态值
   * ===================================
   * preinstall : 预设，表示定义了考试的信息，但是没有添加班级
   * published : 已发布，即已经添加了班级，但是还没有让学生完成的考试。在学生端，也是根据这个属性值来过滤考试信息，然后匹配学生的班级。
   * 
   */
  saveClassesForExam(exam) {
    let self = this
    this.isUpdatingClassesForExam = true
    let body = {
      id: exam['id'],
      classes: JSON.stringify(exam['classes'])
    }
    body['state'] = exam['classes'].length == 0 ? 'inactive' : 'active'
    this.backendService.updateByTableName('exams', body).subscribe(result => {
      self.isUpdatingClassesForExam = false
      if (result['message'] == 'complete') {
        self.fetchAllSavedExams()
        alert('修改成功 ！')
      } else {
        alert('修改失败，请重试')
      }
    })
  }

  fetchAllSavedExams() {
    let self = this
    this.savedExams = []
    this.activeLength = 0
    this.inactiveLength = 0
    this.backendService.fetchAllByTableName('exams').subscribe(result => {
      self.savedExams = result['response']
      self.savedExams.forEach(exam => {
        exam['questions'] = JSON.parse(exam['questions'])
        exam['classes'] = JSON.parse(exam['classes'])
        if (exam['state'] == 'active') {
          self.activeLength += 1
        }
        if (exam['state'] == 'inactive') {
          self.inactiveLength += 1
        }
      });
      console.log(self.savedExams);
    })
  }

  onCourseSelectChanged() {
    let self = this
    let course_id = this.examForm.get('course_id').value
    this.courses.forEach(course => {
      if (course_id == course['id']) {
        self.examForm.patchValue({
          course_name: course['name']
        })
      }
    })
  }

  onAddQuestionSubmit() {
    let self = this
    // 拆分字符串 e.g. choices@选择题
    let qq = this.questionForm.get('question').value.toString()
    this.questionForm.patchValue({
      question: qq.split('@')[0],
      title: qq.split('@')[1]
    })

    let tempQuestions = this.examForm.get('questions').value
    tempQuestions.push(this.questionForm.value)
    this.examForm.patchValue({
      questions: tempQuestions
    })
    // comput all question points
    this.computCurrentTotalPoints()
    this.questionForm.reset()
  }

  onRemoveQuestion(questionObj: any) {
    let self = this
    this.examForm.get('questions').value.forEach((element, index) => {
      if (element['question'] == questionObj['question']) {
        self.examForm.get('questions').value.splice(index, 1)
        self.computCurrentTotalPoints()
      }
    });
  }

  computCurrentTotalPoints() {
    let self = this
    this.currentTotalQuestionsPoints = 0
    this.examForm.get('questions').value.forEach(element => {
      self.currentTotalQuestionsPoints += element['count'] * element['point']
    });
  }

  resetExamFormGroup() {
    this.examForm = this.fb.group({
      id: [''],
      course_id: ['', Validators.required],
      course_name: [''],
      duration: ['90', Validators.required],
      total: ['100', Validators.required],
      questions: [[], Validators.required]
    })
  }

  onExamFormSubmit() {
    let self = this
    this.isSubmitingExam = true

    let questions = this.examForm.get('questions').value
    this.examForm.patchValue({
      id: this.utilityService.getIdByTimestamp(),
      created_datetime: this.utilityService.getDatetime()
    })

    let body = Object.assign({}, this.examForm.value)
    body['questions'] = JSON.stringify(this.examForm.get('questions').value)
    body['classes'] = JSON.stringify([])
    body['state'] = 'inactive'

    this.backendService.addNewByTableName('exams', body).subscribe(data => {
      if (data['effect_rows'] == 1 && data['message'] == 'complete') {
        alert('添加成功 ！')
        self.isSubmitingExam = false
        self.currentTotalQuestionsPoints = 0
        self.resetExamFormGroup()
        self.fetchAllSavedExams()
      }
    })
  }

  removeExam(examId) {

    if (!confirm('确定要删除这项考试吗 ？')) {
      return
    }

    let self = this
    let json = {
      id: examId
    }
    this.backendService.removeByTableName('exams', json).subscribe(result => {
      if (result['effect_rows'] == 1 && result['message'] == 'complete') {
        alert('删除成功 ！')
        self.fetchAllSavedExams()
      } else {
        alert('删除失败，请重试')
      }
    })

  }

}
