import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoutesService } from 'src/app/shared/services/routes/routes.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(
    public routesService: RoutesService,
    public authService: AuthService
  ) {}

  public logoutRequest() {
    this.authService.closeSession();
    this.routesService.link2(this.routesService.routes.public.login);
  }

  public link2route(routerPath: string): void {
    this.routesService.link2(routerPath);
  }
}
