import { Component, OnInit } from '@angular/core';
import { BackendService } from "./backend.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    // let self = this
    // let teacher = new Teacher()
    // this.backendService.fetchAllByTableName('teachers').subscribe(data => {
    //   var jsonObj = data['response'][0]
    //   if (data['response'].length != 0) {
    //     Object.keys(jsonObj).forEach(key => {
    //       teacher[key] = jsonObj[key]
    //     })
    //     GlobalData.currentTeacher = teacher
    //     sessionStorage.setItem('teacherId', teacher.id)
    //   } else {
    //     sessionStorage.removeItem('teacherId')
    //   }
    //   console.log('run app component controller');
    //   console.log(GlobalData.currentTeacher);
    // })
  }
}
