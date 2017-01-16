import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { RoomProxyService } from '../room-proxy.service';
import { Helper } from '../helper';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  public roomId: number = null;
  public roomPwd: number = null;
  public roomHasPwd: boolean = false;
  public status: string = 'waiting for a room number';

  constructor(
    public authService: AuthService,
    public roomProxyService: RoomProxyService
  ) {}

  ngOnInit() {
    let tmp = Helper.getUrlParameter('room');
    this.roomId = tmp.length > 0 ? Number.parseInt(tmp) : null;
    tmp = Helper.getUrlParameter('password');
    this.roomPwd = tmp.length > 0 ? Number.parseInt(tmp) : null;
    if(this.roomId != null)
      this.tryJoin();
  }

  setRoomPassword(event) {
    this.roomPwd = event.value;
    this.tryJoin().then();
  }

  setRoomNumber(event) {
    this.roomId = event.value;
    this.roomHasPwd = false;
    this.tryJoin().then();
  }

  tryJoin() {
    console.log('[JoinComponent] try join room ' + this.roomId + ' (password: ' + this.roomPwd + ')');
    return this.roomProxyService.join(this.roomId, this.roomPwd)
      .catch((err) => {
        this.status = err.json().message;
        if(this.status == 'This room requires a password')
          this.roomHasPwd = true;
      });
  }

  needPassword() {
    return this.roomHasPwd;
  }

  joined() {
    return this.roomProxyService.connected();
  }

  creation() {
    return this.roomProxyService.creation();
  }

  leave() {
    this.roomProxyService.disconnect();
  }

  // filter questions to show
  questions() {
    return this.roomProxyService.room.questions.filter((q) => {
      return q.open || this.hasAnswered(q);
    });
  }

  // has the user answered to the question ?
  hasAnswered(question) {
    let answered: boolean = false;
    question.options.forEach((o) => {
      answered = answered
        || o.answered.findIndex((id) => {
          return id == this.authService.user._id;
        }) != -1;
    });
    return answered;
  }

  // answer to a question
  answerTo(event) {
    this.roomProxyService.answer(event.option).catch(() => {
      alert('An error occured');
    });
  }
}
