import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendService } from "../backend.service";
import { MessageService } from '../message.service';
import { UtilityService } from "../utility.service";
import { Router } from "@angular/router";
import { GlobalData } from '../global/global-data';
declare var $: any

@Component({
  selector: 'app-manage-center',
  templateUrl: './manage-center.component.html',
  styleUrls: ['./manage-center.component.scss'],
  providers: [BackendService, MessageService, UtilityService],
  encapsulation: ViewEncapsulation.None
})
export class ManageCenterComponent implements OnInit {

  currentMenuIndex = 0

  menuList = [
    {
      title: '统计信息',
      icon: 'fa-chart-bar',
      url: 'statistic'
    },
    {
      title: '基础数据',
      icon: 'fa-coins',
      url: 'metadata'
    },
    {
      title: '题库资源',
      icon: 'fa-list',
      questions: GlobalData.questions
    },
    {
      title: '考试设计',
      icon: 'fa-flag-checkered',
      url: 'exam'
    }
  ]

  teacherInfo: any

  constructor(
    private messageService: MessageService,
    private utilityService: UtilityService,
    private router: Router
  ) { }

  ngOnInit() {
    this.utilityService.checkTeacherLogin()
    this.teacherInfo = JSON.parse(sessionStorage.getItem('teacher'))
  }

  selectMenu(index) {
    this.currentMenuIndex = index
  }

  handleQuestionTitleChanged(questionTitle: string) {
    this.messageService.sendQuestionTitleMessage(questionTitle)
  }

  logout() {
    sessionStorage.removeItem('teacher')
    this.router.navigateByUrl('/')
  }

}
