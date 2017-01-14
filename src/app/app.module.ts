import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CoolStorageModule } from 'angular2-cool-storage';
import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';

import { AuthService } from './auth.service';
import { JoinRoomService } from './join-room.service';
import { CreateRoomService } from './create-room.service';
import { RoomProxyService } from './room-proxy.service';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { JoinComponent } from './join/join.component';
import { CreateComponent } from './create/create.component';
import { UserComponent } from './user/user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { QuestionCreationComponent } from './question-creation/question-creation.component';
import { QuestionResultComponent } from './question-result/question-result.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { RoomInfoComponent } from './room-info/room-info.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    JoinComponent,
    CreateComponent,
    UserComponent,
    UserLoginComponent,
    InputNumberComponent,
    QuestionCreationComponent,
    QuestionResultComponent,
    QuestionFormComponent,
    RoomInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ToasterModule,
    CoolStorageModule
  ],
  providers: [
    ToasterService,
    AuthService,
    JoinRoomService,
    CreateRoomService,
    RoomProxyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
