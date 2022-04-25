import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  loading = false;
  user: User;
  userFromApi: User;
  data: {};
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private httpClient: HttpClient
  ) {
    this.user = this.authenticationService.userValue;
  }

  ngOnInit() {
    this.loading = true;
    this.userService
      .getById(this.user.id)
      .pipe(first())
      .subscribe((user) => {
        this.loading = false;
        this.userFromApi = user;
      });
  }

  makeApi() {
    this.httpClient
      .get('/assets/header.json')
      .subscribe((data) => (this.data = data));
  }
}
