import { Component, OnInit } from '@angular/core';
import { Login } from "../../model/login";
import { Md5 } from "../../../../node_modules/ts-md5/dist/md5.js";
import { GlobalData } from "../../global/global-data";

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  login = new Login()
  loginError = false

  constructor() { }

  ngOnInit() {

  }

  execLogin() {
    console.log(this.login.id);
    console.log(this.login.password);
    console.log(this.login.role);

    var self = this

    var currentTeacher = GlobalData.teachers[0]

    if (this.login.role == 'teacher') {
      if (this.login.id == currentTeacher['id'] && Md5.hashStr(this.login.password) == currentTeacher['password']) {
        alert('welcome')
      } else {
        this.loginError = true
        setTimeout(() => {
          self.loginError = false
        }, 2500);
      }
    }


  }

}
