import { Component, OnInit } from '@angular/core';
import { BackendService } from "../backend.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.fetchAllTeachers("teachers")
  }

  fetchAllTeachers(tableName: string) {
    this.backendService.fetchAllByTableName(tableName).subscribe(data => {
      console.log(data);
    })
  }

}
