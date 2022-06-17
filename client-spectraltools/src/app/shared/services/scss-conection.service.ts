import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScssConectionService {
  public getColorStyles( color: string ): string {
    return getComputedStyle(document.body).getPropertyValue(color);
  }
}
