import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UtilityService } from "../utility.service";
import { BackendService } from "../backend.service";

@Component({
  selector: 'app-study-center',
  templateUrl: './study-center.component.html',
  styleUrls: ['./study-center.component.scss'],
  providers: [UtilityService, BackendService]
})
export class StudyCenterComponent implements OnInit {

  currentMenuIndex = 0

  menuList = [
    {
      title: '个人主页',
      url: 'student-profile',
      icon: 'fa-home'
    },
    {
      title: '考试回顾',
      url: 'review-exam',
      icon: 'fa-map'
    }
  ]


  constructor(
    private router: Router,
    private utilityService: UtilityService,
    private backendService: BackendService
  ) { }

  ngOnInit() {
    let self = this
    this.utilityService.checkStudentLogin()
  }

  studentLogout() {
    sessionStorage.removeItem('student')
    this.router.navigateByUrl('/')
  }

}
