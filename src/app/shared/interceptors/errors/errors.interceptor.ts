import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ModalsService } from '../../services/modals/modals.service';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(
    private modalsService: ModalsService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('/assets')) {
      return next.handle(request).pipe(
        catchError( HTTPERROR => {
          // if (HTTPERROR.status != 404) {
          //   // this.modalsService.singleModal(
          //   //   // this.translateService.MODALtYPE.warning
          //   // );
          // }
          return throwError(() => HTTPERROR);
        })
      );
    } else {
      const res = request.clone();
      return next.handle(res);
    }
  }
}
