import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnInit {

  majors = [
    '计算机应用技术',
    '大数据与安全',
    '计算机信息管理',
  ]

  registYears = []
  classNums = []

  constructor() { }

  ngOnInit() {
    console.log('metadata');

    for (let index = 2014; index < 2030; index++) {
      this.registYears.push(index)
    }

    for (let index = 1; index <= 10; index++) {
      let num = String(index)
      if (num.length == 1) {
        num = '0' + num
      }
      this.classNums.push(num)
    }


  }

}
