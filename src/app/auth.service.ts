import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable()
export class AuthService {

  public user: User = new User('test@test.com');

  constructor() { }

  authentificated() {
    return this.user !== null;
  }

  leave() {
    this.user = null;
    location.reload();
  }
}
