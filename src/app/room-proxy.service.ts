import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as wildcard from 'socketio-wildcard';

import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import { Room } from './room';
import { Option } from './option';

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
      }).catch((err) => {
        console.log('[RoomProxyService] create room error: ' + JSON.stringify(err));
      });
  }

  // tell if we are the creator
  creation() {
    return this.connected() 
      && this.authService.authentificated() 
      && this.room.creator.id == this.authService.user._id;
  }

  // join a room
  join(number, password) {

    // normal user
    if(this.authService.authentificated()) {
      // TODO
    }

    // guest
    else {
      return this.authService.logAsGuest(number, password)
        .then(() => {
          this.fetch().then(() => {
            this.connect();
          });
        });
    }
  }

  // fetch a room
  fetch() {
    return this.authService.http()
      .get(environment.restApiUrl + 'rooms/' + this.authService.user._roomID)
      .map((res) => res.json())
      .toPromise()
      .then((data) => {
        this.room = data;
      })
      .catch((err) => {
        console.log('[RoomProxyService] fetching error: ' + JSON.stringify(err));
      });
  }

  // connect to a room
  connect() {
    this.socket = io(environment.restApiUrl, { 
      transports: ['websocket'],
      query: { token : this.authService.token } 
    });
    wildcard(io.Manager)(this.socket);
    
    // TEST
    this.socket.on('*', (data) => {
      console.log('io recv: ' + JSON.stringify(data));
    });

    // TODO
  }

  // disconnect from the current room
  disconnect() {
    // TODO
  }

  // do a patch on the room
  update(patch) {
    return this.authService.http()
      .patch(environment.restApiUrl + 'rooms/' + this.room._id, patch)
      .map((res) => res.json())
      .toPromise()
      .then((data) => {
        this.room = data;
      }).catch((err) => {
        console.log('[RoomProxyService] update room with patch `' + JSON.stringify(patch) + '` returns an error: ' + JSON.stringify(err));
      });
  }

  // answer a question
  answer(option: Option) {
    return this.authService.http()
      .post(environment.restApiUrl + 'answers', {
        roomId: this.room._id,
        answer: option._id
      })
      .toPromise()
      .then(() => {
        option.answered.push(this.authService.user._id);
      })
      .catch((err) => {
        console.log('[RoomProxyService] answering error: ' + JSON.stringify(err));
      });
  }

}
