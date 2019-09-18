import { Component, OnInit } from '@angular/core';
import { StatisticComponent } from "./statistic/statistic.component";
import { MetadataComponent } from "./metadata/metadata.component";

@Component({
  selector: 'app-manage-center',
  templateUrl: './manage-center.component.html',
  styleUrls: ['./manage-center.component.scss']
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
      title: '题库资源',
      icon: 'fa-chart-bar',
      url: 'question-bank'
    },
    {
      title: '基础数据',
      icon: 'fa-coins',
      url: 'metadata'
    },
  ]

  constructor() { }

  ngOnInit() {
  }

  selectMenu(index) {
    this.currentMenuIndex = index
  }

}
