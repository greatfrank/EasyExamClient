import { Component, OnInit } from '@angular/core';
import { Teacher } from "../model/teacher";
import { Student } from "../model/student";

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})
export class RegistComponent implements OnInit {

  teacher = new Teacher()
  student = new Student()

  constructor(
  ) { }

  ngOnInit() {
    this.teacher.department = '电子信息学院'

  }

  registTeacher() {
    console.log(this.teacher)
  }

}
