import { Component, OnInit } from '@angular/core';
import { Login } from "../../model/login";
import { Md5 } from "../../../../node_modules/ts-md5/dist/md5.js";
import { GlobalData } from 'src/app/global/global-data';
import { BackendService } from "../../backend.service";
import { Teacher } from 'src/app/model/teacher';
import { Router } from "@angular/router";

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
    console.log(this.login.id);
    console.log(this.login.password);
    console.log(this.login.role);

    var self = this

    if (this.login.role == 'teacher') {
      let params = new URLSearchParams()
      params.append('id', this.login.id)
      let body = params.toString()
      this.backService.fetchAllByTableName('teachers').subscribe(data => {
        console.log(data);
        if (data['response'].length == 0) {
          alert('请先注册教师信息')
        } else {
          var jsonObj = data['response'][0]
          if (jsonObj['id'] == this.login.id && jsonObj['password'] == Md5.hashStr(this.login.password)) {
            let teacher = new Teacher()
            Object.keys(jsonObj).forEach(key => {
              teacher[key] = jsonObj[key]
            })
            GlobalData.currentTeacher = teacher
            this.router.navigateByUrl('manage-center')
          } else {
            alert('登录信息有误，请重试')
          }
        }
      })
    }
  }

}
