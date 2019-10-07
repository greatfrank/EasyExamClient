import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-codings-modal',
  templateUrl: './codings-modal.component.html',
  styleUrls: ['./codings-modal.component.scss']
})
export class CodingsModalComponent implements OnInit {

  @Input() codingsModalObj

  constructor() { }

  ngOnInit() {
  }

}
