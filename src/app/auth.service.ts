import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable()
export class AuthService {

  public user: User = null;

  constructor() { }

  authentificated() {
    return this.user !== null;
  }

  leave() {
    this.user = null;
  }
}
