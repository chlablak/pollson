import { Component, OnInit, Input } from '@angular/core';

import { Question } from '../question';

@Component({
  selector: 'app-question-result',
  templateUrl: './question-result.component.html',
  styleUrls: ['./question-result.component.css']
})
export class QuestionResultComponent implements OnInit {

  // question model
  @Input()
  question: Question;

  constructor() { }

  ngOnInit() {
  }

  total() {
    let total = 0;
    for(let option of this.question.options)
      total += option.count;
    return total;
  }

  percentage(index) {
    let total = this.total();
    let percentage = total > 0 ? this.question.options[index].count / total : 0;
    return Math.round(percentage * 100) + '%';
  }
}
