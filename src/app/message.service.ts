import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<any>()

  sendQuestionTitleMessage(questionTitle: string) {
    this.subject.next({
      title: questionTitle
    })
  }

  clearQuestionTitleMessage() {
    this.subject.next()
  }

  getQuestionTitleMessage(): Observable<any> {
    return this.subject.asObservable()
  }

  constructor() { }
}
