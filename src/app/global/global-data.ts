import { Teacher } from '../model/teacher'
import { Student } from '../model/student'

export class GlobalData {
    static currentTeacher: Teacher
    static currentStudent: Student
    static globalSources: Object = {
        courses: [],
        classes: []
    }
}