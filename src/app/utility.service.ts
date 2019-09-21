import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  getIdByTimestamp(): any {
    let timestamp = new Date().getTime()
    // 返回 10 位整数，直接剥离掉小数部分
    return Math.trunc(timestamp / 1000)
  }


}
