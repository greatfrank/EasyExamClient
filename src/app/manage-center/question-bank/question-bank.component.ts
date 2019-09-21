import { Component, OnInit } from '@angular/core';
import { GlobalData } from 'src/app/global/global-data';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.scss']
})
export class QuestionBankComponent implements OnInit {

  currentChoice = {
    "id": "",
    "question": "",
    "charters": [],
    "options": [],
    "standard_answer": [],
    "explanation": ""
  }

  sources: any

  constructor() { }

  ngOnInit() {
    this.sources = GlobalData.globalSources
    console.log(this.sources);
    
  }

}
