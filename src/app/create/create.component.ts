import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { CreateRoomService } from '../create-room.service';

import { Question } from '../question';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  // TEST
  question: Question = { text: '', options: [{ text: '', count: 0 }, { text: '', count: 0 }]};

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

}
