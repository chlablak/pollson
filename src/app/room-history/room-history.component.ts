import { Component, OnInit, Input } from '@angular/core';

import { Room } from '../room';

@Component({
  selector: 'app-room-history',
  templateUrl: './room-history.component.html',
  styleUrls: ['./room-history.component.css']
})
export class RoomHistoryComponent implements OnInit {

  @Input()
  room: Room;

  public detail: boolean;

  constructor() { 
  }

  ngOnInit() {
    this.detail = false;
  }

  toggleDetail() {
    this.detail = !this.detail;
  }

  totalVote() {
    let total = 0;
    this.room.questions.forEach((q) => {
      q.options.forEach((o) => {
        total += o.answered.length;
      });
    });
    return total;
  }

  votePerQuestion() {
    return this.room.questions.length > 0 ? (this.totalVote() / this.room.questions.length).toPrecision(2) : 0;
  }

  correctVote() {
    let totalVote = this.totalVote();
    let correctVote = 0;
    this.room.questions.forEach((q) => {
      q.options.filter((o) => {
        return o.answer;
      }).forEach((o) => {
        correctVote += o.answered.length;
      });
    });
    return totalVote > 0 ? Math.round(correctVote / totalVote * 100) : 0;
  }

}
