import { Injectable } from '@angular/core';

import { Room } from './room';

@Injectable()
export class RoomProxyService {

  public room: Room;

  constructor() { 
    this.room = null;
  }

  connected() {
    return this.room != null;
  }

}
