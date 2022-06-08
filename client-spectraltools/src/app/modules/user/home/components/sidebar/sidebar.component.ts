import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoutesService } from 'src/app/shared/services/routes/routes.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(
    public routesService: RoutesService
  ) { }

  logoutRequest() {
  }

  public link2route(routerPath: string): void {
    this.routesService.link2(routerPath);
  }

}
