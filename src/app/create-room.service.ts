import { Injectable } from '@angular/core';

@Injectable()
export class CreateRoomService {

  constructor() { }

  // tells if the service is associated to a room
  creation() {
    return false;
  }

  // start a new room creation
  start() {

  }
}
