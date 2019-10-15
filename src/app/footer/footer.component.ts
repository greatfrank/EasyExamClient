import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  current_year = null
  contacts = [
    {
      key: '姓名',
      name: 'name',
      value: '李鹏',
      icon: 'fas fa-user'
    },
    {
      key: '电话',
      name: 'phone',
      value: '187 0002 7180',
      icon: 'fas fa-phone-volume'
    },
    {
      key: '邮箱',
      name: 'email',
      value: 'lp_frank@163.com',
      icon: 'fas fa-envelope'
    },
    {
      key: '主页',
      name: 'home',
      value: 'https://mercurycharter.com',
      icon: 'fas fa-home'
    }
  ]

  technologyStack = [
    {
      icon: 'angular.png',
      title: 'Angular'
    },
    {
      icon: 'golang.svg',
      title: 'Golang'
    },
    {
      icon: 'mysql.png',
      title: 'MySQL'
    },
    {
      icon: 'gin.png',
      title: 'Gin'
    },
    {
      icon: 'bootstrap.png',
      title: 'Bootstrap'
    },
    {
      icon: 'fontawesome.png',
      title: 'Font Awesome'
    },
    {
      icon: 'jquery.png',
      title: 'jQuery'
    },
    {
      icon: 'nodejs.svg',
      title: 'NodeJS'
    },
    {
      icon: 'graphql.png',
      title: 'GraphQL'
    }
  ]

  constructor() { }

  ngOnInit() {
    this.current_year = new Date().getFullYear()
  }

}
