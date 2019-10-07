import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fills-modal',
  templateUrl: './fills-modal.component.html',
  styleUrls: ['./fills-modal.component.scss']
})
export class FillsModalComponent implements OnInit {

  @Input() fillsModalObj

  constructor() { }

  ngOnInit() {
  }

}
