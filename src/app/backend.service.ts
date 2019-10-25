import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Teacher } from "./model/teacher";
import { Observable, forkJoin } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient) { }

  getContacts() {
    return this.httpClient.get("/contacts")
  }

  fetchMultipleTables(tableNameArr: string[], body?: any) {
    let arr = []
    tableNameArr.forEach(tableName => {
      arr.push(this.fetchAllByTableName(tableName))
    });
    return forkJoin(arr)
  }

  fetchAllByTableName(tableName: string, body?: any) {
    return this.httpClient.post("/fetch/" + tableName, body, httpOptions)
  }

  addNewByTableName(tableName: string, jsonObj: any): Observable<any> {
    let params = new URLSearchParams()
    Object.keys(jsonObj).forEach(key => {
      params.append(key, jsonObj[key])
    });
    let body = params.toString()
    return this.httpClient.post<Teacher>('/new/' + tableName, body, httpOptions)
  }

  removeByTableName(tableName: string, jsonObj: any): Observable<any> {
    let params = new URLSearchParams()
    Object.keys(jsonObj).forEach(key => {
      params.append(key, jsonObj[key])
    })
    let body = params.toString()
    return this.httpClient.post('/remove/' + tableName, body, httpOptions)
  }

  updateByTableName(tableName: string, jsonObj: any): Observable<any> {
    let params = new URLSearchParams()
    Object.keys(jsonObj).forEach(key => {
      params.append(key, jsonObj[key])
    });
    let body = params.toString()
    return this.httpClient.post('/update/' + tableName, body, httpOptions)
  }

  modifyRowsByTableName(tableName: string, jsonObj: any): Observable<any> {
    let params = new URLSearchParams()
    Object.keys(jsonObj).forEach(key => {
      params.append(key, jsonObj[key])
    });
    let body = params.toString()
    return this.httpClient.post('/modify-rows/' + tableName, body, httpOptions)
  }

  /**
   * 
   * @param tableName 
   * @param limit 
   * POST: { course_id: 123456}
   */
  queryQuestionsByTableNameAndLimit(tableName: string, limit: number, jsonObj: any): Observable<any> {
    let params = new URLSearchParams()
    Object.keys(jsonObj).forEach(key => {
      params.append(key, jsonObj[key])
    })
    let body = params.toString()
    return this.httpClient.post('/query/' + tableName + '/' + limit, body, httpOptions)
  }

  /**
   * 
   * @param tableNames 
   * [{
   *  tableName:"",
   *  limit: 10,
   *  obj:{}
   * }]
   */
  queryQuestionsRandom(tableNames: any[]) {
    let requestArray = []
    tableNames.forEach(element => {
      requestArray.push(this.queryQuestionsByTableNameAndLimit(element['tableName'], element['limit'], element['obj']))
    });
    // 当上面所有的请求都完成后，再返回给函数调用者
    return forkJoin(requestArray)
  }


}
