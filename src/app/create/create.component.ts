import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster/angular2-toaster';

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
    public roomProxyService: RoomProxyService,
    public toasterService: ToasterService
  ) {}

  ngOnInit() {
  }

  // create a new room
  create() {

    // checks
    if(!this.authService.authentificated()) {
      this.toasterService.pop('info', 'Create', 'You need to be logged in to create a room');
      return;
    }
    if(this.roomProxyService.connected()) {
      this.toasterService.pop('info', 'Create', 'Please leave your current joined room to start creating an other one');
      return;
    }

    // creation
    this.roomProxyService.create().then(() => {
      this.roomName = this.roomProxyService.room.name;
    }).catch(() => {
      this.toasterService.pop('error', 'Create', 'An error occured');
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
    }).catch(() => {
      this.toasterService.pop('error', 'Set password', 'An error occured');
    });
  }

  // change the room name
  updateName() {
    if(this.roomName.length > 50) {
      this.toasterService.pop('info', 'Update name', 'The room name must not exceed 50 characters');
      return;
    }
    this.roomProxyService.update({
      name: this.roomName
    }).catch(() => {
      this.toasterService.pop('error', 'Update name', 'An error occured');
    });
  }

  // close the room
  close() {
    this.roomProxyService.update({
      open: false
    }).then(() => {
      this.roomProxyService.disconnect();
    }).catch(() => {
      this.toasterService.pop('error', 'Close', 'An error occured');
    })
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
    }).catch(() => {
      this.toasterService.pop('error', 'Validate', 'An error occured');
    });
  }

  // cancel question editing
  cancelQuestion() {
    this.question = null;
  }

  // delete a question
  deleteQuestion(q) {
    this.roomProxyService.update({
      op: 'remove',
      path: '/questions',
      value: { _id: q._id }
    }).catch(() => {
      this.toasterService.pop('error', 'Delete', 'An error occured');
    });
  }

  // toggle open/close 
  toggleQuestion(q) {
    this.roomProxyService.update({
      op: 'replace',
      path: '/questions',
      value: {
        _id: q._id,
        open: !q.open
      }
    }).catch(() => {
      this.toasterService.pop('error', 'Open/Close', 'An error occured');
    });
  }

  // generate quick join link
  joinLink() {
    let link = window.location.toString().split('#', 1)[0];
    link = link + '?room=' + this.roomProxyService.room.id;
    if(this.hasPassword())
      link = link + '&password=' + this.roomProxyService.room.password;
    link = link + '#join';
    return link;
  }
}
