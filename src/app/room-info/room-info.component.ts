import { Component, OnInit, Input } from '@angular/core';

import { Room } from '../room';

@Component({
  selector: 'app-room-info',
  templateUrl: './room-info.component.html',
  styleUrls: ['./room-info.component.css']
})
export class RoomInfoComponent implements OnInit {

  @Input()
  public room: Room;

  constructor() { }

  ngOnInit() {
  }

  total() {
    return 'todo';
  }

  opened() {
    return 'todo';
  }

  closed() {
    return 'todo';
  }

  avgVote() {
    return 'todo';
  }

  notAnswered() {
    return 'todo';
  }

}
