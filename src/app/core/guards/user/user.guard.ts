// Angular implements
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

// Services
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { RoutesService } from '../../../shared/services/routes/routes.service';

@Injectable({providedIn: 'root'})
export class UserGuard implements CanActivate {
    
  constructor(
    private authService: AuthService,
    private routesService: RoutesService,
  ) { }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.recoveryToken()) {
      return true;
    } else {
      this.routesService.link2(
        this.routesService.routes.public.sigin
      );
      return false;
    }
  }

}
