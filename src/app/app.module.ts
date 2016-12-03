import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { JoinComponent } from './join/join.component';
import { CreateComponent } from './create/create.component';
import { UserComponent } from './user/user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { InputNumberComponent } from './input-number/input-number.component';

import { AuthService } from './auth.service';
import { JoinRoomService } from './join-room.service';
import { CreateRoomService } from './create-room.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    JoinComponent,
    CreateComponent,
    UserComponent,
    UserLoginComponent,
    InputNumberComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    AuthService,
    JoinRoomService,
    CreateRoomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
