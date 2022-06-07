// Angular implements
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

// Dependencies
import { JwtHelperService } from '@auth0/angular-jwt';

// Services
import { RoutesService } from '../routes/routes.service';

// Interfaces
import { 
  authInfo,
  sessionType,
  tokenInterface,
  tokensInterface,
} from '../../interfaces/tokenInterface.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private jwtHelperService = new JwtHelperService();
  private storageService = new StorageService();
  
  constructor(
    private routesService: RoutesService,
  ) { }

  public login( token: string, persistenSession: boolean ): void {
    this.storageService.setLocalStorageItem('sessionType',{'persistent': persistenSession});

    if(persistenSession) {
      this.storageService.setLocalStorageItem('authInfo',{'token': token});
    }else{
      this.storageService.setSessionStorageItem('authInfo',{'token': token});
    }
  }

  public verifySessionType(): boolean {
    const sessionType: sessionType | null =
    this.storageService.getLocalStorageItem('sessionType') as (sessionType | null);
    if(sessionType) {
      if(sessionType.persistent) {
        return true;
      }
    }
    return false;
  }
  
  public recoveryToken(): tokensInterface | null {
    let decryptToken: tokenInterface;
    let responseToken: tokensInterface | null = null;

    if(this.verifySessionType()) {
      const tokenLocal: authInfo | null =
        this.storageService.getLocalStorageItem('authInfo') as (authInfo | null);
      
      if( tokenLocal ) {
        decryptToken = this.jwtHelperService.decodeToken(tokenLocal.token);
        responseToken = {
          token: tokenLocal.token,
          tokenDecrypt: decryptToken
        };
      }

    } else {
      const tokenSesion: authInfo | null =
      this.storageService.getSessionStorageItem('authInfo') as (authInfo | null);

      if( tokenSesion ) {
        decryptToken = this.jwtHelperService.decodeToken(tokenSesion.token);
        responseToken = {
          token: tokenSesion.token,
          tokenDecrypt: decryptToken
        };
      }
    }
    return responseToken;
  }   
  
  public closeSession():void {
    this.routesService.link2(this.routesService.routes.public.sigin);
    this.storageService.clearLocalStorage();
    this.storageService.clearSessionStorage();
  }

}
