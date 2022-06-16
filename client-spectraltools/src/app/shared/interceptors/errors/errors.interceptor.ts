import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ModalsService } from 'src/app/shared/services/modals/modals.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  constructor(private modalsService: ModalsService,
    private authService: AuthService,) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('/assets')) {
      return next.handle(request).pipe(
        catchError((HTTPERROR) => {
          if (HTTPERROR.status === 401) {
            this.authService.closeSession();
            this.modalsService.singleModal(
              HTTPERROR.error.message,
              'OK',
              this.modalsService.MODALTYPE.danger
            );
          } else {
            this.modalsService.singleModal(
              HTTPERROR.error.message,
              'OK',
              this.modalsService.MODALTYPE.danger
            );
          }
          return throwError(() => HTTPERROR);
        })
      );
    } else {
      const res = request.clone();
      return next.handle(res);
    }
  }
}
