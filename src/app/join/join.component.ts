import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { RoomProxyService } from '../room-proxy.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public roomProxyService: RoomProxyService
  ) {}

  ngOnInit() {
  }

  setRoomPassword(event) {

  }

  setRoomNumber(event) {

  }

  hasPassword() {
    return false;
  }

  joined() {
    return false;
  }

  status() {
    
  }
}
