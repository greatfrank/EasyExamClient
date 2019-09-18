import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
