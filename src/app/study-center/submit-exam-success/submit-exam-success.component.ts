import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-submit-exam-success',
  templateUrl: './submit-exam-success.component.html',
  styleUrls: ['./submit-exam-success.component.scss']
})
export class SubmitExamSuccessComponent implements OnInit, OnDestroy {

  private sub: any
  info: any

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let self = this
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      self.info = params
    },
      err => {
        alert(err)
      }
    )
  }

  ngOnDestroy() {
    sessionStorage.removeItem('exam')
    this.sub.unsubscribe()
  }

}
