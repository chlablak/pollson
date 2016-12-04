import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable()
export class AuthService {

  // current user
  public user: User = null;

  constructor() { }

  // tells if their is an authentificated user
  authentificated() {
    return this.user !== null;
  }

  // log out
  leave() {
    this.user = null;
  }
}
