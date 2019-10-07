import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-choices-modal',
  templateUrl: './choices-modal.component.html',
  styleUrls: ['./choices-modal.component.scss']
})
export class ChoicesModalComponent implements OnInit {

  @Input() choicesModalObj

  constructor() { }

  ngOnInit() {
  }

}
