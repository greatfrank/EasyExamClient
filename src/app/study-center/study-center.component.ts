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
      title: '个人中心',
      url: 'student-profile',
      icon: 'fa-home'
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
    sessionStorage.removeItem('exam')
    this.router.navigateByUrl('/')
  }

}
