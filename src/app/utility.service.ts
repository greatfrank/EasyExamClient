import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  getIdByTimestamp(): any {
    return Math.floor(Math.random() * 100000 + 1)
  }


}
