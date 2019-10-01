import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import * as moment from 'moment'
declare var $: any
@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private router: Router) { }

  getIdByTimestamp(): any {
    let timestamp = new Date().getTime()
    // 返回 10 位整数，直接剥离掉小数部分
    return Math.trunc(timestamp / 1000)
  }

  getDatetime() {
    return moment().format('YYYY-MM-DD HH:mm:ss')
  }

  checkTeacherLogin() {
    if (!sessionStorage.getItem('teacher')) {
      this.router.navigateByUrl('/')
    }
  }

  checkStudentLogin() {
    if (!sessionStorage.getItem('student')) {
      this.router.navigateByUrl('/')
    }
  }

  goToTop() {
    $('html, body').animate({
      scrollTop: 0
    }, 500)
  }

}
