import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { UserService, AuthenticationService } from '../_services';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  user;
  constructor(private authenticationService: AuthenticationService) {
    this.user = this.authenticationService.userValue;
  }
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const API_KEY = '123456';
    const TOKEN = this.user.token;
    return next.handle(httpRequest.clone({ setHeaders: { API_KEY, TOKEN } }));
  }
}
