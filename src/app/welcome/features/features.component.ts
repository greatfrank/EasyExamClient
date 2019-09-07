import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

  features = [
    {
      icon: 'feature-0.png',
      title: 'Online',
      desc: '在线随机生成不同的试卷，支持多种题型。在线完成考试题目，促进无纸化教学'
    },
    {
      icon: 'feature-1.png',
      title: 'Auto',
      desc: '学生提交试卷后，系统自动完成判分。并通过多种算法向学生公布考卷作答的情况，提供考试的透明度'
    },
    {
      icon: 'feature-2.png',
      title: 'Statistics',
      desc: '根据学生的成绩，高细粒度的统计学生的答题情况。教师可以根据设定灵活分析学生的原始成绩，并生成多样化的图表'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
