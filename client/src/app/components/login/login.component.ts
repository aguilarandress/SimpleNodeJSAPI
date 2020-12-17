import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import User from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: User = {
    _id: '',
    email: '',
    username: '',
    password: '',
  };

  constructor(
    private flashMessageService: FlashMessagesService,
    private routerService: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  public onSubmit(): void {
    // Login request
    this.authService.authenticateUser(this.user).subscribe(
      (response: any) => {
        const { token } = response;
        this.authService.setAuthenticationToken(token);
        this.routerService.navigateByUrl('/posts');
      },
      (err) => {
        const { error } = err;
        this.flashMessageService.show(error.msg, {
          cssClass: 'alert alert-danger',
        });
      }
    );
  }
}
