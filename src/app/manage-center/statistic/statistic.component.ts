import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../backend.service";
import { UtilityService } from "../../utility.service";
import { Chart } from "angular-highcharts";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
  providers: [BackendService, UtilityService]
})
export class StatisticComponent implements OnInit {

  leftMenu = [
    {
      title: '基础数据',
      en: 'Meta Data',
      icon: 'fa-coins',
      url: ''
    },
    {
      title: '学生信息',
      en: 'Student Info',
      icon: 'fa-user-graduate',
      url: ''
    },
    {
      title: '考试相关',
      en: 'About Exam',
      icon: 'fa-flag-checkered',
      url: ''
    },
    {
      title: '成绩分析',
      en: 'Score Analysis',
      icon: 'fa-chart-line',
      url: ''
    }
  ]
  currentMenuIndex = 0


  metadata = {
    classes: [],
    courses: []
  }
  originalStudents = []
  students = []
  exams = []

  // 分组后的学生考试信息
  studentExams = []
  // 选中的 course_id
  selectedCourseId = ""
  // 选中的 class_id
  selectedClassId = ""
  // 选中的班级列表
  selectedClassList = []
  // 通过course_id 和 class_id 得到的学生列表
  selectedStudents = []
  // 平时成绩与考试成绩的百分比
  percentage = 40
  // 统计最值时的参照，是按照期末成绩的原始分统计，还是按照综合评定统计
  minMaxTig = "score"
  // 最低分，最高分，及格率
  minMaxPass = {
    min: '',
    max: '',
    pass: ''
  }
  // 成绩分段统计人数
  intPattern = "^[0-9]+$"
  rangeForm = this.fb.group({
    low: ['', [Validators.required, Validators.pattern(this.intPattern)]],
    high: ['', [Validators.required, Validators.pattern(this.intPattern)]],
    people: [0]
  })
  ranges = []
  rangeChart = null
  finishComputRanges = false

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.utilityService.goToTop()
    this.setupMetadata()
  }

  // >>>>>>>>>>>>>>>>> 处理左侧菜单的切换
  toggleLeftMenu(index) {
    this.currentMenuIndex = index
    switch (this.currentMenuIndex) {
      case 0:
        this.setupMetadata()
        break
      case 1:
        break
      case 2:
        this.setupExam()
        break
      case 3:
        this.setupStudentExam()
        break
      default:
        this.setupMetadata()
        break
    }
  }

  // >>>>>>>>>>>>>>>>> 获得基础数据，包含班级和课程
  setupMetadata() {
    this.setupClassesData()
    this.setupCoursesData()
    this.setupStudents()
  }

  // 获得班级信息
  setupClassesData() {
    let self = this
    this.backendService.fetchAllByTableName('classes').subscribe(result => {
      self.metadata.classes = result['response']
      // console.log(self.metadata.classes);
    })
  }

  // 获得课程信息
  setupCoursesData() {
    let self = this
    this.backendService.fetchAllByTableName('courses').subscribe(result => {
      self.metadata.courses = result['response']
      // console.log(self.metadata.courses);
    })
  }

  // >>>>>>>>>>>>>>>>> 结构化学生的注册信息，并按照班级进行分组
  setupStudents() {
    let self = this
    this.backendService.fetchAllByTableName('students').subscribe(result => {
      self.students = result['response']
      for (let i = 0; i < self.students.length; i++) {
        const student = self.students[i];
        for (let j = 0; j < self.metadata.classes.length; j++) {
          const classObj = self.metadata.classes[j];
          if (classObj['id'] == student['class_id']) {
            student['class_name'] = classObj['full_name']
          }
        }
      }
      // Save the original Data of students before group
      self.originalStudents = self.students
      // group students data by class
      self.students = self.utilityService.groupData(self.students, 'class_id', 'class_name', 'list')
    })
  }

  // >>>>>>>>>>>>>>>>> 结构化课程与考试模板之间的关系
  setupExam() {
    let self = this
    this.backendService.fetchAllByTableName('exams').subscribe(result => {
      self.exams = result['response']

      self.exams.forEach(exam => {
        exam['classes'] = JSON.parse(exam['classes'])
        exam['questions'] = JSON.parse(exam['questions'])
        let questionSeries = []
        exam['questions'].forEach((element, index) => {
          if (index == 0) {
            questionSeries.push({
              name: element['title'],
              y: element['count'],
              sliced: true,
              selected: true
            })
          } else {
            questionSeries.push({
              name: element['title'],
              y: element['count']
            })
          }
        });
        exam['chart'] = new Chart({
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: '题型数量分布'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
              }
            }
          },
          series: [{
            name: '试题占比',
            colorByPoint: true,
            data: questionSeries
          }]
        } as any)
      });
    })
  }

  // >>>>>>>>>>>>>>>>> 结构化学生考试成绩的数据
  setupStudentExam() {
    this.studentExams = []
    this.selectedCourseId = ""
    this.selectedClassId = ""
    this.selectedClassList = []
    this.selectedStudents = []
    this.percentage = 40

    let self = this
    this.backendService.fetchAllByTableName('student_exam').subscribe(result => {
      let originalStudentExams = result['response']

      originalStudentExams = originalStudentExams.filter(element => element['marked'] == '1')

      // Add full_name for class by class_id
      originalStudentExams.forEach(element => {
        for (let i = 0; i < self.metadata.classes.length; i++) {
          const cla = self.metadata.classes[i];
          if (element['class_id'] == cla['id']) {
            element['class_name'] = cla['full_name']
            break
          } else {
            continue
          }
        }
        // Add course_name for course by course_id
        for (let j = 0; j < self.metadata.courses.length; j++) {
          const course = self.metadata.courses[j];
          if (element['course_id'] == course['id']) {
            element['course_name'] = course['name']
            break
          } else {
            continue
          }
        }
        // Add student_name for student by student_id
        for (let i = 0; i < self.originalStudents.length; i++) {
          const student = self.originalStudents[i];
          if (element['student_id'] == student['id']) {
            element['student_name'] = student['username']
          }
        }
      });

      self.studentExams = self.utilityService.groupData(originalStudentExams, 'course_id', 'course_name', 'list')

      for (let i = 0; i < self.studentExams.length; i++) {
        const classDetail = self.studentExams[i]['list'];
        self.studentExams[i]['list'] = this.utilityService.groupData(classDetail, 'class_id', 'class_name', 'list')
      }
    })
  }

  handleCourseSelectorChanged() {
    this.selectedClassId = ''
    this.selectedStudents = []
    for (let i = 0; i < this.studentExams.length; i++) {
      if (this.studentExams[i]['course_id'] == this.selectedCourseId) {
        this.selectedClassList = this.studentExams[i]['list']
        break
      } else {
        continue
      }
    }
  }

  handleClassSelectorChanged() {
    this.resetRanges()
    this.selectedStudents = []
    for (let i = 0; i < this.selectedClassList.length; i++) {
      const students = this.selectedClassList[i];
      if (students['class_id'] == this.selectedClassId) {
        this.selectedStudents = students['list']
        break
      } else {
        continue
      }
    }

    // according to the percentage, comput the total_mark for every student
    for (let i = 0; i < this.selectedStudents.length; i++) {
      const element = this.selectedStudents[i];
      element['total_mark'] = this.computTotalMark(element['regular_grade'], element['score'])
    }
    this.getMinMaxPassFromStudents(this.selectedStudents)
    this.finishComputRanges = false
  }

  handlePercentageChange() {
    if (this.selectedStudents.length == 0) {
      return
    }
    for (let i = 0; i < this.selectedStudents.length; i++) {
      const element = this.selectedStudents[i];
      element['total_mark'] = this.computTotalMark(element['regular_grade'], element['score'])
    }
    this.getMinMaxPassFromStudents(this.selectedStudents)
    this.computRange(this.selectedStudents)
  }

  handleRegularGradeChange(index) {
    let regular_grade = this.selectedStudents[index]['regular_grade']
    // Check the range of regular_grade, if invalid then reset it
    if (regular_grade < 0 || regular_grade > 100) {
      this.selectedStudents[index]['regular_grade'] = 0
    }
    // re-assign the variable regular_grade
    regular_grade = this.selectedStudents[index]['regular_grade']
    let score = this.selectedStudents[index]['score']
    this.selectedStudents[index]['total_mark'] = this.computTotalMark(regular_grade, score)
    this.getMinMaxPassFromStudents(this.selectedStudents)
    this.computRange(this.selectedStudents)
  }

  saveStudentExamTotalMark(selectedStudents) {

    if (!confirm("确定要保存学生的成绩吗？ 一旦保存，则无法修改")) {
      return
    }

    let dataArr = []

    selectedStudents.forEach(element => {
      let obj = {
        id: element['id'],
        regular_grade: element['regular_grade'],
        total_mark: element['total_mark'],
        saved: 1
      }
      dataArr.push(obj)
    });

    let body = {
      data: JSON.stringify(dataArr)
    }

    this.backendService.modifyRowsByTableName('student_exam', body).subscribe(result => {
      console.log(result);
      if (result['message'] == 'complete') {
        alert('保存成功 ！')
      } else {
        alert('保存失败，请重试')
      }
    })
  }

  computTotalMark(regularGrade, score) {
    let result = Math.round(regularGrade * this.percentage * 0.01 + score * (100 - this.percentage) * 0.01)
    this.getMinMaxPassFromStudents(this.selectedStudents)
    return result
  }

  checkIfSavedTotalMark(data: any): boolean {
    let result = false
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element['saved'] == '0') {
        result = false
        continue
      } else {
        result = true
        break
      }
    }
    return result
  }

  getMinMaxPassFromStudents(objList: any) {
    let arr = []

    switch (this.minMaxTig) {
      // 按照期末考试的原始成绩计算
      case 'score':
        objList.forEach(element => {
          arr.push(element['score'])
        });
        break
      // 按照综合评定的成绩计算
      default:
        objList.forEach(element => {
          arr.push(element['total_mark'])
        });
        break
    }

    // 计算最值
    let min = Math.min.apply(null, arr)
    let max = Math.max.apply(null, arr)

    // 计算及格率
    let passNum = 0
    let totalNum = arr.length
    arr.forEach(v => {
      if (v >= 60) {
        passNum += 1
      }
    });

    this.minMaxPass.min = String(min)
    this.minMaxPass.max = String(max)
    this.minMaxPass.pass = (passNum / totalNum) * 100 + " %"
  }

  handleMinMaxTigChange(value) {
    this.minMaxTig = value
    this.getMinMaxPassFromStudents(this.selectedStudents)
    this.computRange(this.selectedStudents)
  }

  addRange() {
    this.finishComputRanges = false
    if (this.rangeForm.get('low').value >= this.rangeForm.get('high').value) {
      alert('分值范围不合理，请重试')
      return
    }
    this.ranges.push(this.rangeForm.value)
    this.rangeForm.reset()
  }

  removeRange(index) {
    this.ranges.splice(index, 1)
  }

  computRange(objList: any) {
    this.finishComputRanges = false
    if (this.ranges.length != 0) {
      this.ranges.forEach(element => {
        element['people'] = 0
      });
    }

    let arr = []
    switch (this.minMaxTig) {
      // 按照期末考试的原始成绩计算
      case 'score':
        objList.forEach(element => {
          arr.push(element['score'])
        });
        break
      // 按照综合评定的成绩计算
      default:
        objList.forEach(element => {
          arr.push(element['total_mark'])
        });
        break
    }

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      for (let j = 0; j < this.ranges.length; j++) {
        const range = this.ranges[j];
        if (item >= range['low'] && item <= range['high']) {
          range['people'] += 1
        }
      }
    }
    this.finishComputRanges = true
    this.generateRangeChart()
  }

  resetRanges() {
    this.ranges = []
    this.rangeForm.reset()
  }

  generateRangeChart() {
    let arr = []
    this.ranges.forEach((range, index) => {
      if (index == 0) {
        arr.push({
          name: range['low'] + ' ~ ' + range['high'],
          y: range['people'],
          sliced: true,
          selected: true
        })
      } else {
        arr.push({
          name: range['low'] + ' ~ ' + range['high'],
          y: range['people']
        })
      }
    });

    this.rangeChart = new Chart({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: '分值范围人数统计'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: '人数',
        colorByPoint: true,
        data: arr
      }]
    } as any)




  }

}
