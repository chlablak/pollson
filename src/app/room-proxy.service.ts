import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import { Room } from './room';

@Injectable()
export class RoomProxyService {

  public room: Room;

  constructor(public authService: AuthService) { 
    this.room = null;
  }

  // tell if the proxy is connected to a room
  connected() {
    return this.room != null;
  }

  // create a new room
  create() {
    return this.authService.http()
      .post(environment.restApiUrl + 'rooms', { name: 'new room' })
      .map((res) => res.json())
      .toPromise()
      .then((data) => {
        this.room = data;
      });
  }

  // tell if we are the creator
  creation() {
    return this.connected() 
      && this.authService.authentificated() 
      && this.room.creator.id == this.authService.user.id;
  }

  // connect to a room
  connect(number, password?) {

  }

  // disconnect from the current room
  disconnect() {

  }

  // do a patch on the room
  update(patch) {
    return this.authService.http()
      .patch(environment.restApiUrl + 'rooms/' + this.room._id, patch)
      .map((res) => res.json())
      .toPromise()
      .then((data) => {
        this.room = data;
      });
  }

}
