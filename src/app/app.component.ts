import { Component } from '@angular/core';
import { ToasterService } from 'angular2-toaster/angular2-toaster';

import { AuthService } from './auth.service';
import { RoomProxyService } from './room-proxy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public authService: AuthService,
    private toasterService: ToasterService,
    public roomProxyService: RoomProxyService
  ) {}

  disconnect() {
      this.authService.leave();
      this.toasterService.pop('info', 'Logout', 'Disconnection succeed !');
  }
}
