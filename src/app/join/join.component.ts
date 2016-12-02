import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { JoinRoomService } from '../join-room.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public joinRoomService: JoinRoomService
  ) {}

  ngOnInit() {
  }

  doJoin(event) {
    alert(JSON.stringify(event));
  }
}
