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
  public limit: number;

  constructor(
    public authService: AuthService,
    public toasterService: ToasterService
  ) {
    this.rooms = [];
    this.limit = 5;
  }

  ngOnInit() {
    if(this.authService.authentificated())
      this.fetch();
  }

  fetch() {
    this.authService.http()
      .get(environment.restApiUrl + 'rooms?owner=' + this.authService.user._id + '&$limit=' + this.limit + '&$sort=-createdAt')
      .map((res) => res.json())
      .toPromise()
      .then((data) => {
        this.rooms = data.data;
      })
      .catch((err) => {
        console.log('[UserComponent] fetching error: ' + JSON.stringify(err));
        this.toasterService.pop('error', 'History', 'An error occured');
      });
  }

  loadMore() {
    this.limit += 5;
    this.fetch();
  }
}
