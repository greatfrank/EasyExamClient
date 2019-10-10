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

  replaceAll(str: string, searchStr: string, replaceStr: string) {
    return str.split(searchStr).join(replaceStr)
  }

  groupData(originalData: any[], tag_id: string, tag_name: string, arr_name: string) {
    // 分组后最终的数组
    let groupedResult = []
    // 给数组中先放入一个json数据，作为标签
    originalData.forEach(element => {
      let json = {}
      json[tag_id] = element[tag_id]
      json[tag_name] = element[tag_name]
      groupedResult.push(json)
    });
    // 标签去重 
    groupedResult = this.removeDuplicateObjects(groupedResult)
    // 遍历原始数据，把与标签里某个属性相同的数据放在该组的list数组中
    for (let i = 0; i < groupedResult.length; i++) {
      const g = groupedResult[i];
      g[arr_name] = []
      for (let j = 0; j < originalData.length; j++) {
        const element = originalData[j];
        if (element[tag_id] == g[tag_id]) {
          g[arr_name].push(element)
        }
      }
    }
    return groupedResult
  }

  removeDuplicateObjects(array: any[]) {
    let tempArr = array.map(s => JSON.stringify(s))
    let tempSet = new Set(tempArr)
    let arr = Array.from(tempSet)
    let result = arr.map(s => JSON.parse(s))
    return result
  }




}
