import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as wildcard from 'socketio-wildcard';
import { CoolLocalStorage } from 'angular2-cool-storage';

import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import { Room } from './room';
import { Option } from './option';

@Injectable()
export class RoomProxyService {

  public room: Room;
  public socket: any;

  constructor(
    public authService: AuthService,
    public localStorage: CoolLocalStorage
  ) { 
    this.room = null;
    this.socket = null;

    // get room from storage if any
    this.room = this.localStorage.getObject('room');
    if(this.room != null)
      this.connect();
  }

  // tell if the proxy is connected to a room
  connected() {
    return this.room != null && this.socket != null;
  }

  // create a new room
  create() {
    return this.authService.http()
      .post(environment.restApiUrl + 'rooms', { name: 'new room' })
      .map((res) => res.json())
      .toPromise()
      .then((data) => {
        this.setRoom(data);
        this.connect();
      }).catch((err) => {
        console.log('[RoomProxyService] create room error: ' + JSON.stringify(err));
      });
  }

  // tell if we are the creator
  creation() {
    return this.connected() 
      && this.authService.authentificated() 
      && this.room.creator._id == this.authService.user._id;
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
        this.setRoom(data);
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
      // TODO clean here
      console.log('io recv: ' + JSON.stringify(data));
      if(data.data[0] == 'rooms patched') {
        console.log('PATCH...');
        this.setRoom(data.data[1]);
        console.log('DONE!');
      }
    });

    // TODO ?
  }

  // disconnect from the current room
  disconnect() {
    this.room = null;
    this.socket.disconnect();
    this.socket = null;
    this.localStorage.removeItem('room');
  }

  // do a patch on the room
  update(patch) {
    return this.authService.http()
      .patch(environment.restApiUrl + 'rooms/' + this.room._id, patch)
      .map((res) => res.json())
      .toPromise()
      .then((data) => {
        this.setRoom(data);
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
        this.setRoom(this.room);
      })
      .catch((err) => {
        console.log('[RoomProxyService] answering error: ' + JSON.stringify(err));
      });
  }

  setRoom(room: Room) {
    this.room = room;
    this.localStorage.setObject('room', room);
  }
}
