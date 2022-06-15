/* eslint-disable max-len */
import { getTestBed, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

// Interceptors
import { TokenInterceptor } from './token.interceptor';

// Services
import { AuthService } from '../../services/auth/auth.service';

// Dependencies
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Token } from '@angular/compiler';

describe('GIVEN InterceptorTokensInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let router: Router;


  const routes: Routes = [{ path: 'signin' }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        TokenInterceptor,
        HttpClient,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: Token,
          multi: true,
        },
      ],
    });
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  });

  it('WHEN init THEN should be created', () => {
    const interceptor: TokenInterceptor = TestBed.inject(TokenInterceptor);
    expect(interceptor).toBeTruthy();
  });

  // Interceptor of token
  it('WHEN an httprequest is THEN enter the token', () => {
    http
      .get(`http://localhost:3000/permisos?All=1&Page=&Elements=1`)
      .subscribe((response) => {
        expect(response).toBeTruthy();
      });
    const httpRequest = httpMock.expectOne({
      method: 'get',
      url: 'http://localhost:3000/permisos?All=1&Page=&Elements=1',
    });
    expect(httpRequest.error).toBeTruthy();
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
  });

  it('WHEN an httprequest is THEN enter the token', () => {
    http.get(`test/assets/i18n/`).subscribe((response) => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne({
      method: 'get',
      url: 'test/assets/i18n/',
    });
    expect(httpRequest.error).toBeTruthy();
    expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();
  });

  // Start session and get token funtion
  it('WHEN use #getToken returns the token or if there is no empty return ', () => {
    const testBed = getTestBed();
    const tokenInterceptor = testBed.inject(TokenInterceptor);
    const authService = testBed.inject(AuthService);
    authService.login(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJlZnJhaW5AZ21haWwuY29tIiwiaWF0IjoxNjQ2Njc1MjQxLCJleHAiOjE2NDY2Nzg4NDF9.mWXxOKvbL0FQUwKNd-ynof8mCccqMRVcZiZXXzqb6LM',
      true
    );
    expect(tokenInterceptor.getToken()).not.toEqual('');
    authService.closeSession();
    expect(tokenInterceptor.getToken()).toEqual('');
  });
});
