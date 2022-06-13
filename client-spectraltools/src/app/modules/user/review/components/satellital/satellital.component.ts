import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';
import { PointsInterface } from '../../../interfaces/pointsInfo.interface';
import { IPlagueLocation } from 'src/app/core/models/IPlaguePlot';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-satellital',
  templateUrl: './satellital.component.html',
  styleUrls: ['./satellital.component.scss'],
})
export class SatellitalComponent implements AfterViewInit {
  
  public plaguePlot!: Observable<IPlagueLocation>;
  
  marcadores: PointsInterface[] = [];
  map!: Map;

  @ViewChild('mapDiv')
    mapDivElement!: ElementRef;
  lng: number = -101.37662;
  lat: number = 19.89423;

  ngAfterViewInit(): void {
    // if (!this.userLocation )

    this.map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/satellite-v9',
      // center: this.plotservice.center;
      center: [this.lng, this.lat],
      zoom: 17,
    });

    this.createMarker(this.lng, this.lat);
    console.log(this.marcadores);
  }

  public createMarker(lng: number, lat: number) {
    const marker = new Marker({
      draggable: true,
    })
      .setLngLat([this.lng, this.lat])
      .addTo(this.map);

    // marker.on('drag', () => {
    //   console.log(marker.getLngLat());
    // });
  }

  public agregarMarcador(evento: any) {
    const nvoMarker = new Marker({
      draggable: true,
    })
      .setLngLat([this.lng, this.lat])
      .addTo(this.map);

    nvoMarker.setDraggable(true);

    nvoMarker.on('drag', () => {
      return this.marcadores.push(nvoMarker.getLngLat());
    });
  }
}
