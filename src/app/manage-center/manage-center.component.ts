import { Component, OnInit } from '@angular/core';
import { StatisticComponent } from "./statistic/statistic.component";
import { MetadataComponent } from "./metadata/metadata.component";
import { BackendService } from "../backend.service";
import { GlobalData } from "../global/global-data";

@Component({
  selector: 'app-manage-center',
  templateUrl: './manage-center.component.html',
  styleUrls: ['./manage-center.component.scss'],
  providers: [BackendService]
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
      url: 'question-bank'
    },
  ]

  sources = {
    classes: [],
    courses: []
  }

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    let self = this
    Object.keys(this.sources).forEach(key => {
      self.backendService.fetchAllByTableName(key).subscribe(data => {
        self.sources[key] = data['response']
        GlobalData.globalSources[key] = data['response']
      })
    })
  }

  selectMenu(index) {
    this.currentMenuIndex = index
  }

}
