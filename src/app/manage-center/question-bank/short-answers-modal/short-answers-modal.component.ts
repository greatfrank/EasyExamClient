import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-short-answers-modal',
  templateUrl: './short-answers-modal.component.html',
  styleUrls: ['./short-answers-modal.component.scss']
})
export class ShortAnswersModalComponent implements OnInit {

  @Input() shortAnswersModalObj

  constructor() { }

  ngOnInit() {
  }

}
