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
      desc: '在线随机生成不同的试卷，支持多种题型，降低作弊嫌疑。在线完成考试题目，促进无纸化教学'
    },
    {
      icon: 'feature-1.png',
      title: 'Auto',
      desc: '学生提交试卷后，系统自动完成判分。并通过多种算法向学生公布考卷作答的情况，提供考试的透明度'
    },
    {
      icon: 'feature-2.png',
      title: 'Statistics',
      desc: '根据学生的成绩，高细粒度的统计学生的答题情况。教师设定条件，程序自动分析学生的考试成绩'
    }
  ]

  featureDetails = [
    {
      texts: [
        '教师自定义试卷模板，支持普遍的四大题型',
        '可以将班级添加到相应的试卷模板下，即可完成该班级的所有学生的考试发布',
        '通过图表直观的展示试卷题型的分布情况'
      ],
      images: ['feature-1.JPG', 'feature-2.JPG']
    },
    {
      texts: [
        '通过调整不同的参数和约束条件，全自动的对学生的原始成绩进行分析和统计',
        '教师可以查看每一位学生实际作答的试卷',
        '题库是在线考试系统的数据资源，教师可以编辑题目，给出标准答案，这些题库资源将作为学生随机抽题的依据'
      ],
      images: ['feature-3.JPG', 'feature-4.JPG', 'feature-5.JPG']
    },
    {
      texts: [
        '学生登录后，可以查看自己的基本信息，以及考试的信息',
        '一旦教师将某门课程的考试发布后，学生即可开始进入考试，同时还能够看到梅一门考试的状态',
        '学生根据试卷模板，随机抽取题目，在线作答。降低了考试作弊的风险'
      ],
      images: ['feature-6.JPG', 'feature-7.JPG']
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
