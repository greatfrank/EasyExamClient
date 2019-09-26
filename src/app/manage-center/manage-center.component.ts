import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendService } from "../backend.service";
import { MessageService } from '../message.service';
import { UtilityService } from "../utility.service";
import { Router } from "@angular/router";
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
      dropdown: [
        {
          title: '选择 题',
          icon: 'fa-check-circle',
          url: 'choices'
        },
        {
          title: '填空 题',
          icon: 'fa-edit',
          url: 'fills'
        },
        {
          title: '判断 题',
          icon: 'fa-calendar-check',
          url: 'judges'
        },
        {
          title: '简答 题',
          icon: 'fa-comment-dots',
          url: 'short_answers'
        },
        {
          title: '编程 题',
          icon: 'fa-code',
          url: 'codings'
        },
      ]
    },
    {
      title: '考试设计',
      icon: 'fa-flag-checkered',
      url: 'exam'
    },
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
    console.log(this.teacherInfo);

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
