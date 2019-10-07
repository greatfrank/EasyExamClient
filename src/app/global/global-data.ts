import { Teacher } from '../model/teacher'
import { Student } from '../model/student'

export class GlobalData {
  static currentTeacher: Teacher
  static currentStudent: Student
  static questions = [
    {
      title: '选择题',
      icon: 'fa-check-circle',
      url: 'choices'
    },
    {
      title: '填空题',
      icon: 'fa-edit',
      url: 'fills'
    },
    {
      title: '判断题',
      icon: 'fa-calendar-check',
      url: 'judges'
    },
    {
      title: '简答题',
      icon: 'fa-comment-dots',
      url: 'short_answers'
    },
    {
      title: '编程题',
      icon: 'fa-code',
      url: 'codings'
    }
  ]
  static menuList: any[] = [
    {
      title: '统计信息',
      icon: 'fa-chart-bar',
      base_url: 'statistic'
    },
    {
      title: '基础数据',
      icon: 'fa-coins',
      base_url: 'metadata'
    },
    {
      title: '题库资源',
      icon: 'fa-list',
      base_url: 'question-bank',
      dropdown: GlobalData.questions
    },
    {
      title: '考试相关',
      icon: 'fa-flag-checkered',
      base_url: 'exam',
      dropdown: [
        {
          title: '考试设计',
          icon: 'fa-ruler-combined',
          url: 'exam-design'
        },
        {
          title: '考试阅卷',
          icon: 'fa-user-edit',
          url: 'exam-mark'
        }
      ]
    }
  ]
  static globalSources: Object = {
    courses: [],
    classes: []
  }
  static studentSelectedExam: any
}