import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { RoomProxyService } from '../room-proxy.service';

import { Question } from '../question';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public roomName: string = null;
  public question: Question = null;

  constructor(
    public authService: AuthService,
    public roomProxyService: RoomProxyService
  ) {}

  ngOnInit() {
  }

  // create a new room
  create() {

    // checks
    if(!this.authService.authentificated()) {
      alert('You need to be logged in to create a room.');
      return;
    }
    if(this.roomProxyService.connected()) {
      alert('Please leave your current joined room to start creating an other one.');
      return;
    }

    // creation
    this.roomProxyService.create().then(() => {
      this.roomName = this.roomProxyService.room.name;
    }).catch((err) => {
      alert('An error occured: ' + JSON.stringify(err));
    });
  }

  // tell if we are in creation mode
  creation() {
    return this.roomProxyService.creation();
  }

  // tell if the room has a password
  hasPassword() {
    return this.roomProxyService.room.password != null;
  }

  // set the room password
  setRoomPassword(event) {
    this.roomProxyService.update({
      password: event.value
    }).catch((err) => {
      alert("An error occured: " + JSON.stringify(err));
    });
  }

  // change the room name
  updateName() {
    if(this.roomName.length > 50) {
      alert('The room name must not exceed 50 characters.');
      return;
    }
    this.roomProxyService.update({
      name: this.roomName
    }).catch((err) => {
      alert("An error occured: " + JSON.stringify(err));
    });
  }

  // close the room
  close() {
    // TODO
  }

  // add a new question (creation)
  addQuestion() {
    this.question = { text: '', options: [{ text: '' }, { text: '' }], open: false };
  }

  // validate the new question
  validateQuestion(event) {
    this.roomProxyService.update({
      op: 'add',
      path: '/questions',
      value: this.question
    }).then(() => {
      this.cancelQuestion();
    }).catch((err) => {
      alert('An error occured: ' + JSON.stringify(err));
    });
  }

  // cancel question editing
  cancelQuestion() {
    this.question = null;
  }

  // delete a question
  deleteQuestion(q) {
    // TODO
  }

  // toggle open/close 
  toggleQuestion(q) {
    // TODO
  }
}
