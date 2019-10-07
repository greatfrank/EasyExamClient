import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-judges-modal',
  templateUrl: './judges-modal.component.html',
  styleUrls: ['./judges-modal.component.scss']
})
export class JudgesModalComponent implements OnInit {

  @Input() judgesModalObj

  constructor() { }

  ngOnInit() {
  }

}
