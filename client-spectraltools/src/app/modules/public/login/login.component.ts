import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalsService } from 'src/app/shared/services/modals/modals.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LoginDTO } from 'src/app/core/models/loginDTO';
import { ILogin } from 'src/app/core/models/ILogin';
import { RoutesService } from 'src/app/shared/services/routes/routes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthLoginService } from 'src/app/core/services/auth-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  public LOGINFORMGROUP!: FormGroup;
  public recoveryPasword = false;

  constructor(
    private formBuilder: FormBuilder,
    private modalsService: ModalsService,
    private authService: AuthService,
    private routesService:RoutesService,
    private authLoginService: AuthLoginService,
  ) { }

  ngOnInit(): void {
    this.initLoginFormGroup();
  }

  private initLoginFormGroup(): void {
    this.LOGINFORMGROUP = this.formBuilder.group({
      email: [ null, [ Validators.required, Validators.email ] ],
      password: [ null, [ Validators.required ] ]
    });
  }

  public get loginEmailControl(): FormControl {
    return this.LOGINFORMGROUP.get('email') as FormControl;
  }

  public get loginPasswordControl(): FormControl {
    return this.LOGINFORMGROUP.get('password') as FormControl;
  }

  public forgotPassword(): void {
    this.recoveryPasword = true;
  }

  public async loginSubmit(): Promise<void> {
    this.loginRequest();
  }

  private loginSuccess( response: ILogin ): void {
    this.modalsService.close();
    this.authService.login(response.access_token, true);
    this.routesService.link2(this.routesService.routes.user.home.main);
  }

  private emailLoginError( error: HttpErrorResponse): void {
    if (error.status === 403) {
      this.modalsService.close();
      this.modalsService.singleModal(
        'Error en la autenticación',
        'OK',
        this.modalsService.MODALTYPE.info
      );
    }
  }

  // ------------ Conections ------------ //
  private loginRequest(): void {
    this.modalsService.loading(
      'Cargando'
    );
    const BODY: LoginDTO = {
      email: this.loginEmailControl.value,
      password: this.loginPasswordControl.value
    };
    this.authLoginService.loggControllerLogin(BODY).subscribe({
      next: response => this.loginSuccess(response),
      error: error => {
        this.emailLoginError(error);
        if( error.status === 403 ) {
          this.modalsService.close();
          this.modalsService.singleModal(
            '','',
            this.modalsService.MODALTYPE.danger);
        }
      }
    });
  }

}

