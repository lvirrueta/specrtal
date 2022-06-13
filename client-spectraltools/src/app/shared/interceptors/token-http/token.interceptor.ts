import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('/assets/i18n/')) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      });
      const res = request.clone({
        headers,
      });
      return next.handle(res);
    } else {
      const res = request.clone();
      return next.handle(res);
    }
  }

  public getToken(): string {
    const getToken = this.authService.recoveryToken();
    return getToken ? getToken.token : '';
  }
}
