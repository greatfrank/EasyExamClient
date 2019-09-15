import { Component, OnInit } from '@angular/core';
import { Teacher } from "../model/teacher";
import { Student } from "../model/student";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})
export class RegistComponent implements OnInit {

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  idPattern = "[0-9]*"

  teacher = new Teacher()
  student = new Student()

  teacherForm = this.formBuilder.group({
    id: ['', [Validators.required,Validators.pattern(this.idPattern)]],
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    department: ['', Validators.required],
  })

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.teacher.department = '电子信息学院'
  }

  onSubmit(): void {
    console.log(this.teacherForm.value);
  }

  registTeacher() {
    console.log(this.teacher)
  }

}
