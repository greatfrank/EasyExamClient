import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../backend.service";
import { UtilityService } from "../../utility.service";
import { Chart } from "angular-highcharts";

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
  students = []
  exams = []

  studentExams = []

  constructor(
    private backendService: BackendService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.utilityService.goToTop()
    this.setupMetadata()
  }

  // >>> 获得基础数据，包含班级和课程
  setupMetadata() {
    this.setupClassesData()
    this.setupCoursesData()
  }

  // 获得班级信息
  setupClassesData() {
    let self = this
    this.backendService.fetchAllByTableName('classes').subscribe(result => {
      self.metadata.classes = result['response']
      console.log(self.metadata.classes);

    })
  }

  // 获得课程信息
  setupCoursesData() {
    let self = this
    this.backendService.fetchAllByTableName('courses').subscribe(result => {
      self.metadata.courses = result['response']
      console.log(self.metadata.courses);

    })
  }

  // >>> 结构化学生的注册信息，并按照班级进行分组
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
      self.students = self.utilityService.groupData(self.students, 'class_id', 'class_name', 'list')
    })
  }

  // >>> 结构化学生考试的数据
  setupStudentExam() {
    console.log('run student exam');

    let self = this
    this.backendService.fetchAllByTableName('student_exam').subscribe(result => {
      let originalStudentExams = result['response']
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
      });

      self.studentExams = self.utilityService.groupData(originalStudentExams, 'course_id', 'course_name', 'list')

      for (let i = 0; i < self.studentExams.length; i++) {
        const classDetail = self.studentExams[i]['list'];
        self.studentExams[i]['list'] = this.utilityService.groupData(classDetail, 'class_id', 'class_name', 'list')
      }
      console.log(self.studentExams);
    })
  }

  // >>> 结构化课程与考试模板之间的关系
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
      console.log(self.exams);
    })
  }

  // >>> 结构化成绩分析数据

  toggleLeftMenu(index) {
    this.currentMenuIndex = index
    switch (this.currentMenuIndex) {
      case 0:
        this.setupMetadata()
        break
      case 1:
        this.setupStudents()
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

}
