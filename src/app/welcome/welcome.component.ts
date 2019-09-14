import { Component, OnInit } from '@angular/core';
import { BackendService } from "../backend.service";
import { GlobalData } from "../global/global-data";
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
      var teachers = data['response']
      GlobalData.teachers = teachers
      console.log(teachers);

    })
  }

}
