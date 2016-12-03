import { Injectable } from '@angular/core';

@Injectable()
export class JoinRoomService {

  constructor() { }

  setRoomNumber(id) {
    
  }

  setRoomPassword(password) {
    
  }

  hasPassword() {
    return false;
  }

  joined() {
    return false;
  }

  status() {
    let message: string = 'waiting for a room number';
    return message + '...';
  }

}
