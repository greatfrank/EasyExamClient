import { Component, OnInit } from '@angular/core';
import { BackendService } from "../../backend.service";
import { UtilityService } from "../../utility.service";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
  providers: [BackendService, UtilityService]
})
export class StatisticComponent implements OnInit {

  constructor(
    private backendService: BackendService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.utilityService.goToTop()
  }

}
