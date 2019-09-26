import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendService } from "../backend.service";
import { MessageService } from '../message.service';
declare var $: any

@Component({
  selector: 'app-manage-center',
  templateUrl: './manage-center.component.html',
  styleUrls: ['./manage-center.component.scss'],
  providers: [BackendService, MessageService],
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
          icon: '',
          url: 'choices'
        },
        {
          title: '填空 题',
          icon: '',
          url: 'fills'
        },
        {
          title: '判断 题',
          icon: '',
          url: 'judges'
        },
        {
          title: '简答 题',
          icon: '',
          url: 'short_answers'
        },
        {
          title: '编程 题',
          icon: '',
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

  constructor(
    private backendService: BackendService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  selectMenu(index) {
    this.currentMenuIndex = index
  }

  handleQuestionTitleChanged(questionTitle: string) {
    this.messageService.sendQuestionTitleMessage(questionTitle)
  }

}
