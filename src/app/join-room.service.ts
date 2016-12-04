import { Injectable } from '@angular/core';

@Injectable()
export class JoinRoomService {

  constructor() { }

  // set the room number
  setRoomNumber(id) {
    
  }

  // set the room password
  setRoomPassword(password) {
    
  }

  // tells if the room number needs a password too
  hasPassword() {
    return false;
  }

  // tells if there is an associated room
  joined() {
    return false;
  }

  // get the current status message
  status() {
    let message: string = 'waiting for a room number';
    return message + '...';
  }

}
