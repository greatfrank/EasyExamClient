import { Component, OnInit } from '@angular/core';
import { UtilityService } from "../utility.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  constructor(
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.utilityService.goToTop()
  }
}
