import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from '../auth.service';

import { Room } from '../room';

@Component({
  selector: 'app-room-info',
  templateUrl: './room-info.component.html',
  styleUrls: ['./room-info.component.css']
})
export class RoomInfoComponent implements OnInit {

  @Input()
  public room: Room;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  total() {
    return this.room.questions.length;
  }

  opened() {
    return this.room.questions.filter((q) => {
      return q.open;
    }).length;
  }

  closed() {
    return this.total() - this.opened();
  }

  avgVote() {
    let count = 0;
    this.room.questions.forEach((q) => {
      q.options.forEach((o) => {
        count += o.answered.length;
      });
    });
    return (count / this.total()).toPrecision(2);
  }

  notAnswered() {
    return this.room.questions.filter((q) => {
      return q.open;
    }).filter((q) => {
      let answered: boolean = false;
      q.options.forEach((o) => {
        answered = answered 
          || o.answered.findIndex((id) => {
            return id == this.authService.user.id;
          }) != -1;
      });
    }).length;
  }

}
