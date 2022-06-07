import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  public routes = {
    public: {
      landing: '',
      sigin: '/sigin',
    },
    user: {
      home: '/user',
    },
  };

  constructor(
    private router: Router,
  ) { }

  public urlSnapshot(): string {
    return this.router.url;
  }

  public async link2( route: string ): Promise<boolean> {
    return await this.router.navigate([route]);
  }

  public changeRouteWithTimer( route:string, time: number): Promise<void> {
    return new Promise<void>( (resolve) => {
      setTimeout(() => {
        this.router.navigate([route]);
        resolve();
      }, time);
    });
  }
  
}
