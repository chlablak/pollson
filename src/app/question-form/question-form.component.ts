import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Question } from '../question';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {

  // question model
  @Input()
  question: Question;

  // choice event
  @Output()
  onChoice: any = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  // emit the choice
  choice(option) {
    this.onChoice.emit({ 'option': option });
  }

}
