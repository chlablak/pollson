import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { CreateRoomService } from '../create-room.service';

import { Question } from '../question';
import { Option } from '../option';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  // TEST
  question: Question = new Question('Comment ça va?', false, [new Option('Bien', 15), new Option('Bof', 5)]);

  constructor(
    public authService: AuthService,
    public createRoomService: CreateRoomService
  ) {}

  ngOnInit() {
  }

  // TEST
  validate(event) {
    console.log('validate(' + JSON.stringify(event) + ')');
  }

  // TEST
  choice(event) {
    console.log('choice(' + JSON.stringify(event) + ')');
    this.question.options[event.index].count++;
  }

  // TEST
  diag() {
    return JSON.stringify(this.question);
  }

}
