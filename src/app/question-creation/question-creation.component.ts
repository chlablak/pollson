import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ToasterService } from 'angular2-toaster/angular2-toaster';

import { Question } from '../question';
import { Option } from '../option';

@Component({
  selector: 'app-question-creation',
  templateUrl: './question-creation.component.html',
  styleUrls: ['./question-creation.component.css']
})
export class QuestionCreationComponent implements OnInit {

  // input question model
  @Input()
  question: Question;

  // actions events 
  @Output()
  onValidate: any = new EventEmitter();

  // maxmium of options possible
  MAX_OPTIONS: number = 10;

  constructor(
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
  }

  // add a new empty option
  push() {
    if(this.question.options.length < this.MAX_OPTIONS)
      this.question.options.push({ text: '', answer: false, answered: [] });
    else
      this.toasterService.pop('info', 'Question', 'Maximum number of options reached.')
  }

  // remove the option 
  remove(index) {
    this.question.options.splice(index, 1);
  }

  // set answer
  setAnswer(option) {
    if(option.answer) {
      this.question.options.forEach((o) => {
        o.answer = false;
      });
      option.answer = true;
    }
  }

  // validate the question
  validate() {
    
    // remove empty options
    let i = 0;
    while(i < this.question.options.length) {
      for(i = 0; i < this.question.options.length; i++) {
        if(this.question.options[i].text.length == 0) {
          this.remove(i);
          break;
        }
      }
    }

    // check if all informations are present
    if(this.question.text.length == 0) {
      this.toasterService.pop('error', 'Validation', 'The question is missing.');
      return;
    }
    if(this.question.options.length < 2) {
      this.toasterService.pop('error', 'Validation', 'There must be at least 2 options.');
      return;
    }

    // all ok, emit to the parent
    this.onValidate.emit();
  }

}
