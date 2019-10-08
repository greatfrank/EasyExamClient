import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendService } from "../backend.service";
import { MessageService } from '../message.service';
import { UtilityService } from "../utility.service";
import { Router } from "@angular/router";
import { GlobalData } from '../global/global-data';
declare var $: any

@Component({
  selector: 'app-manage-center',
  templateUrl: './manage-center.component.html',
  styleUrls: ['./manage-center.component.scss'],
  providers: [BackendService, MessageService, UtilityService],
  encapsulation: ViewEncapsulation.None
})
export class ManageCenterComponent implements OnInit {

  currentMenuIndex = 0

  // Top navigator menu list
  menuList = GlobalData.menuList

  // Teacher info json
  teacherInfo: any

  constructor(
    private backendService: BackendService,
    private messageService: MessageService,
    private utilityService: UtilityService,
    private router: Router
  ) { }

  ngOnInit() {
    this.utilityService.checkTeacherLogin()
    this.teacherInfo = JSON.parse(sessionStorage.getItem('teacher'))

    this.backendService.fetchAllByTableName('courses').subscribe(result => {
      GlobalData.globalSources['courses'] = result['response']
    })
    this.backendService.fetchAllByTableName('classes').subscribe(result => {
      GlobalData.globalSources['classes'] = result['response']
    })
  }

  selectMenu(index) {
    this.currentMenuIndex = index
  }

  handleQuestionTitleChanged(questionTitle: string) {
    if (questionTitle.indexOf('exam') != -1) {
      return
    }
    this.messageService.sendQuestionTitleMessage(questionTitle)
  }

  logout() {
    sessionStorage.removeItem('teacher')
    this.router.navigateByUrl('/')
  }

}
