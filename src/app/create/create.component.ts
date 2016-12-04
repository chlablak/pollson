import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { CreateRoomService } from '../create-room.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public createRoomService: CreateRoomService
  ) {}

  ngOnInit() {
  }

}
