import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as wildcard from 'socketio-wildcard';

import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import { Room } from './room';

@Injectable()
export class RoomProxyService {

  public room: Room;
  public socket: any;

  constructor(public authService: AuthService) { 
    this.room = null;
    this.socket = null;
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
        this.connect();
      });
  }

  // tell if we are the creator
  creation() {
    return this.connected() 
      && this.authService.authentificated() 
      && this.room.creator.id == this.authService.user.id;
  }

  // join a room
  join(number, password?) {

  }

  // connect to a room
  connect() {
    this.socket = io(environment.restApiUrl, {
      transports: ['websocket']
    });
    wildcard(io.Manager)(this.socket);

    // TEST
    this.socket.emit('answer::create', { 'text': 'hello' });
    console.log('io sent');
    this.socket.on('*', (data) => {
      console.log('io recv: ' + JSON.stringify(data));
    });
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
