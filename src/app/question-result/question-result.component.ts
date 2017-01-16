import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from '../auth.service';
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

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  // no correct answer?
  noAnswer() {
    return !this.question.options.map((o) => {
      return o.answer;
    }).reduce((a, b) => {
      return a || b;
    }, false);
  }

  // has the user answered?
  hasAnswered(option) {
    return this.authService.authentificated() 
      && option.answered.findIndex((id) => {
        return id == this.authService.user._id;
      }) != -1;
  }

  // total number of vote
  total() {
    let total = 0;
    for(let option of this.question.options)
      total += option.answered.length;
    return total;
  }

  // percentage for a specific option
  percentage(index) {
    let total = this.total();
    let percentage = total > 0 ? this.question.options[index].answered.length / total : 0;
    return Math.round(percentage * 100) + '%';
  }
}
