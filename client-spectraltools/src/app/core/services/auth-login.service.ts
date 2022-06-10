import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginDTO } from 'src/app/core/models/loginDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthLoginService {
  private url = 'http://localhost:3000/auth';

  constructor(private http: HttpClient, private route: Router) {}

  public loggControllerLogin(BODY: LoginDTO): Observable<any> {
    return this.http.post(`${this.url}/login`, BODY);
  }
}
