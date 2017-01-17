import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster/angular2-toaster';

import { AuthService } from '../auth.service';
import { Room } from '../room';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public rooms: Room[];

  constructor(
    public authService: AuthService,
    public toasterService: ToasterService
  ) {
    this.rooms = [];
  }

  ngOnInit() {
    if(this.authService.authentificated())
      this.fetch();
  }

  fetch() {
    this.authService.http()
      .get(environment.restApiUrl + 'rooms?owner=' + this.authService.user._id)
      .map((res) => res.json())
      .toPromise()
      .then((data) => {
        console.log(JSON.stringify(data));
      })
      .catch((err) => {
        console.log('[UserComponent] fetching error: ' + JSON.stringify(err));
        this.toasterService.pop('error', 'History', 'An error occured');
      });

    // TODO html
  }
}
