import { Component, OnInit } from '@angular/core';
import { Login } from "../../model/login";
import { Md5 } from "../../../../node_modules/ts-md5/dist/md5.js";
import { GlobalData } from 'src/app/global/global-data';
import { BackendService } from "../../backend.service";
import { Teacher } from 'src/app/model/teacher';
import { Router } from "@angular/router";
import { Student } from 'src/app/model/student';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
  providers: [BackendService]
})
export class SignComponent implements OnInit {

  login = new Login()
  loginError = false
  constructor(
    private backService: BackendService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  execLogin() {
    var self = this
    /**
     * =====================
     * Teacher Login
     * =====================
     */
    if (this.login.role == 'teacher') {
      let params = new URLSearchParams()
      params.append('id', this.login.id)
      let body = params.toString()
      this.backService.fetchAllByTableName('teachers').subscribe(data => {
        if (data['response'].length == 0) {
          alert('请先注册教师信息')
        } else {
          var jsonObj = data['response'][0]
          if (jsonObj['id'] == this.login.id && jsonObj['password'] == Md5.hashStr(this.login.password)) {
            let teacher = new Teacher()
            Object.keys(jsonObj).forEach(key => {
              teacher[key] = jsonObj[key]
            })
            sessionStorage.setItem('teacher', JSON.stringify(teacher))
            this.router.navigateByUrl('manage-center/statistic')
          } else {
            alert('登录信息有误，请重试')
          }
        }
      })
      /**
     * =====================
     * Student Login
     * =====================
     */
    } else {
      let params = new URLSearchParams()
      params.append('id', this.login.id)
      let body = params.toString()
      this.backService.fetchAllByTableName('students', body).subscribe(data => {
        console.log(data);
        if (data['response'].length == 0) {
          alert('查询不到该学生的信息，或者学生信息有误。')
        } else {
          var jsonObj = data['response'][0]
          if (jsonObj['id'] == this.login.id && jsonObj['password'] == Md5.hashStr(this.login.password)) {
            let student = new Student()
            Object.keys(jsonObj).forEach(key => {
              student[key] = jsonObj[key]
            })
            sessionStorage.setItem('student',JSON.stringify(student))
            this.router.navigateByUrl('study-center/student-profile')
            alert('登录成功，页面需要跳转到学生首页')
          } else {
            alert('登录信息有误，请重试')
          }
        }
      })
    }
  }

}
