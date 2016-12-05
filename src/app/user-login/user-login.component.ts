import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster/angular2-toaster';

import { AuthService } from '../auth.service';

import { User } from '../user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  public loginForm: FormGroup;
  public registerForm: FormGroup;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      passwordConfirm: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    })
  }

  // do the log in
  doLogin() {

    // check form
    if(!this.loginForm.valid) {
      this.toasterService.pop('info', 'Log in', 'Invalid inputs.');
      return;
    }

    // create the payload
    let user = new User(
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value
    );

    // ask for login
    this.authService.authentificate(user).then(() => {
      this.toasterService.pop('success', 'Log in', 'You are logged in !');
    }).catch((err) => {
      console.log(JSON.stringify(err));
      this.toasterService.pop('error', 'Log in', 'An error occured, please try again.');
    });
  }

  // do the registration
  doRegister() {

    // check form
    if(!this.registerForm.valid) {
      this.toasterService.pop('info', 'Register', 'Invalid inputs.');
      return;
    }

    // check passwords
    if(this.registerForm.controls['password'].value != this.registerForm.controls['passwordConfirm'].value) {
      this.toasterService.pop('info', 'Register', 'The passwords are not the same.');
      return;
    }

    // check ok, create the payload
    let user = new User(
      this.registerForm.controls['email'].value,
      this.registerForm.controls['password'].value
    );

    // ask for registration, if ok log in too
    this.authService.register(user).then(() => {
      this.toasterService.pop('success', 'Register', 'Registration succeed !');
      this.authService.authentificate(user).then(() => {
        this.toasterService.pop('success', 'Register', 'You are logged in !');
      }).catch((err) => {
        console.log(JSON.stringify(err));
        this.toasterService.pop('error', 'Register', 'Auto-login fails, please use the log in form.');
      });
    }).catch((err) => {
      console.log(JSON.stringify(err));
      this.toasterService.pop('error', 'Register', 'Registration failure, please try again.');
    });
  }
}
