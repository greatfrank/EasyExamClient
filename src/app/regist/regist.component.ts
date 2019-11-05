import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Teacher } from "../model/teacher";
import { Student } from "../model/student";
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from "../backend.service";
import { UtilityService } from "../utility.service";

declare var $: any

/**
 * ================================
 * 注意 ID 必须是小于等于 11 位的整数，否则无法插入到数据库中 ！！！ 
 * ================================
 */

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss'],
  providers: [BackendService, UtilityService]
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
  classes = []

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
    private router: Router,
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    let self = this
    this.utilityService.goToTop()
    this.teacher.department = '电子信息学院'
    this.backendService.fetchAllByTableName('teachers').subscribe(data => {
      if (data['response'].length != 0) {
        self.isTeacherRegisted = true
      } else {
        self.isTeacherRegisted = false
      }
    })
    this.backendService.fetchAllByTableName('classes').subscribe(result => {
      self.classes = result['response']
    })

    setTimeout(() => {
      $("#exampleModalCenter").modal('show')
    }, 500);
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
        sessionStorage.setItem('student', JSON.stringify(self.studentForm.value))
        self.studentForm.reset()
        self.router.navigateByUrl('study-center/student-profile')
        // 直接跳转到学习页面或者考试页面，注意值的传递
      } else {
        alert('注册失败，请重试')
      }
    })
  }

}
