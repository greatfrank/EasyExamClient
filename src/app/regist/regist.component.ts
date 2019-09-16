import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Teacher } from "../model/teacher";
import { Student } from "../model/student";
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from "../backend.service";
import { GlobalData } from "../global/global-data";

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss'],
  providers: [BackendService]
})
export class RegistComponent implements OnInit {

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  idPattern = "[0-9]*"
  mobilePhonePattern = "^[0-9]{11}$"

  isTeacherRegisted = false
  isRunTeacherRegisting = false
  isRunStudentRegisting = false

  teacher = new Teacher()
  student = new Student()
  classes = [
    {
      title: '高职计算机应用技术1901',
      class_id: '2324325'
    },
    {
      title: '高职计算机应用技术1902',
      class_id: '1321'
    },
    {
      title: '高职计算机应用技术1903',
      class_id: '76879'
    }
  ]

  teacherForm = this.formBuilder.group({
    id: ['', [Validators.required, Validators.pattern(this.idPattern)]],
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    department: ['电子信息学院', Validators.required],
  })

  studentForm = this.formBuilder.group({
    id: ['', [Validators.required, Validators.pattern(this.idPattern)]],
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    class_id: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(this.mobilePhonePattern)]],
    gender: ['', Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private backendService: BackendService
  ) { }

  ngOnInit() {
    let self = this
    this.teacher.department = '电子信息学院'
    this.backendService.fetchAllByTableName('teachers').subscribe(data => {
      if (data['response'].length != 0) {
        self.isTeacherRegisted = true
      } else {
        self.isTeacherRegisted = false
      }
    })
  }

  onTeacherSubmit(): void {
    let self = this
    this.isRunTeacherRegisting = true

    this.backendService.addNewByTableName('teachers', this.teacherForm.value).subscribe(data => {
      self.isRunTeacherRegisting = false
      if (data['effect_rows'] == 1) {
        alert('教师注册成功 ！')
        // 直接跳转到管理页面，注意值的传递
      } else {
        alert('注册失败，请重试')
      }
    })
  }

  onStudentSubmit(): void {
    let self = this
    this.isRunStudentRegisting = true

    this.backendService.addNewByTableName('students', this.studentForm.value).subscribe(data => {
      self.isRunStudentRegisting = false
      if (data['effect_rows'] == 1) {
        alert('学生注册成功 ！')
        // 直接跳转到学习页面或者考试页面，注意值的传递
      } else {
        alert('注册失败，请重试')
      }
    })
  }

}
