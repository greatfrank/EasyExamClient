import { Teacher } from '../model/teacher'
import { Student } from '../model/student'

export class GlobalData {
    static currentTeacher: Teacher
    static currentStudent: Student
    static questions:any[] = [
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
    static globalSources: Object = {
        courses: [],
        classes: []
    }
}