import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import { CoolLocalStorage } from 'angular2-cool-storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { User } from './user';
import { environment } from '../environments/environment';

@Injectable()
export class AuthService {

  // current user
  public user: User = null;

  // current token
  public token: string = null;

  // logged as guest ?
  public guest: boolean = null;

  // AuthHttp wrapper
  private authHttp: AuthHttp = null;

  constructor(
    private baseHttp: Http,
    private localStorage: CoolLocalStorage
  ) {

    // get data from storage
    this.user = this.localStorage.getObject('user');
    this.token = this.localStorage.getItem('token');
    this.guest = this.localStorage.getObject('guest');

    // configure the wrapper
    this.authHttp = new AuthHttp(new AuthConfig({
      tokenGetter: (() => this.token),
      globalHeaders: [{ 'Content-Type': 'application/json' }],
      noTokenScheme: true
    }), baseHttp);
  }

  // tells if their is an authentificated user
  authentificated() {
    return this.user !== null && !this.guest;
  }

  // log out
  leave() {
    this.user = null;
    this.token = null;
    this.guest = null;
    this.localStorage.removeItem('token');
    this.localStorage.removeItem('user');
    this.localStorage.removeItem('guest');
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
        this.user._id = data.data._id;
        this.guest = false;
        this.localStorage.setItem('token', this.token);
        this.localStorage.setObject('user', this.user);
        this.localStorage.setObject('guest', this.guest);
      });
  }

  // log as guest
  logAsGuest(roomid: number, roompwd: number) {
    this.leave();
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ 'headers': headers });
    let payload = { room: roomid };
    if(roompwd != null)
      payload['password'] = roompwd;
    return this.baseHttp.post(
        environment.restApiUrl + 'guests', 
        JSON.stringify(payload), 
        options
      )
      .map((res) => res.json())
      .toPromise()
      .then((data) => {

        // save current user and his token
        this.token = data.token;
        this.user = new User(data.guestId + '@guest.pollson');
        this.user._id = data.guestId;
        this.user._roomID = data.roomId;
        this.guest = true;
        this.localStorage.setItem('token', this.token);
        this.localStorage.setObject('user', this.user);
        this.localStorage.setObject('guest', this.guest);
      });
  }

  // get room id
  getRoomID(roomid: number, roompwd: number) {
    let payload = { room: roomid };
    if(roompwd != null)
      payload['password'] = roompwd;
    return this.http().post(
        environment.restApiUrl + 'guests', 
        JSON.stringify(payload)
      )
      .map((res) => res.json())
      .toPromise()
      .then((data) => {

        // save room id
        this.user._roomID = data.roomId;
      });
  }

  // get the wrapper
  http() {
    return this.authHttp;
  }
}
