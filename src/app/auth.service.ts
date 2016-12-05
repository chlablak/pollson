import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import { LocalStorage } from 'angular2-localstorage/WebStorage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { User } from './user';
import { environment } from '../environments/environment';

@Injectable()
export class AuthService {

  // current user
  @LocalStorage()
  public user: User = null;

  // current token
  @LocalStorage()
  public token: string = null;

  // AuthHttp wrapper
  private authHttp: AuthHttp = null;

  constructor(
    private baseHttp: Http
  ) {

    // configure the wrapper
    this.authHttp = new AuthHttp(new AuthConfig({
      tokenGetter: (() => this.token),
      globalHeaders: [{ 'Content-Type': 'application/json' }]
    }), baseHttp);
  }

  // tells if their is an authentificated user
  authentificated() {
    return this.user !== null;
  }

  // log out
  leave() {
    this.user = null;
  }

  // create a new user
  register(user: User) {

    // send a request to create a new user
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ 'headers': headers });
    return this.baseHttp.post(
        environment.restApiUrl + 'users', 
        JSON.stringify({ email: user.email, password: user.password }), 
        options
      )
      .map(res => res.json())
      .toPromise();
  }

  // login
  authentificate(user: User) {

    // send a request to login, on success store the user   
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ 'headers': headers });
    return this.baseHttp.post(
        environment.restApiUrl + 'auth/local', 
        JSON.stringify({ email: user.email, password: user.password }), 
        options
      )
      .map(res => res.json())
      .toPromise()
      .then((data) => {

        // save current user and his token
        this.token = data.token;
        this.user = user;
      });
  }

  // get the wrapper
  http() {
    return this.authHttp;
  }
}
