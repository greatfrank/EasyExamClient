import { Component, OnInit } from '@angular/core';
import { BackendService } from "../backend.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  current_year = null
  contacts = []

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

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    let self = this
    this.current_year = new Date().getFullYear()

    this.backendService.getContacts().subscribe(result => {
      const keys = Object.keys(result)
      keys.forEach(key => {
        self.contacts.push({
          key: key.split('-')[1],
          value: result[key]
        })
      });


    })
  }

}
