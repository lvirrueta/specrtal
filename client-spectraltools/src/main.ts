/* eslint-disable max-len */
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl';
 
Mapboxgl.accessToken = 'pk.eyJ1IjoibHV1bmExNSIsImEiOiJjbDRjNHpyYTQwbDdrM3Byb2R4dzVqdTRmIn0.TDaQBmeeGtEDY0yZgtlYAQ';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  // eslint-disable-next-line no-console
  .catch(err => console.error(err));
