import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';
import { PointsInterface } from '../../../interfaces/pointsInfo.interface';
import { ModalsService } from 'src/app/shared/services/modals/modals.service';
import { PlaguePlotService } from '../../../../../core/services/plaguePlot.service';
import { IPlaguePlot } from '../../../../../core/models/IPlaguePlot';

@Component({
  selector: 'app-satellital',
  templateUrl: './satellital.component.html',
  styleUrls: ['./satellital.component.scss'],
})
export class SatellitalComponent implements OnInit {
  public plaguePlot!: IPlaguePlot;
  controlPoints: PointsInterface[] = [];
  polygonPoints: PointsInterface[] = [];
  marcador: PointsInterface = {
    lat: 0,
    lng: 0,
  };
  mapPoint!: Map;
  mapPolygon!: Map;

  @ViewChild('mapDiv')
    mapDivElement!: ElementRef;

  constructor(
    private modalsService: ModalsService,
    private plaguePlotService: PlaguePlotService
  ) {}

  ngOnInit(): void {
    this.getPlaguePlot();
  }

  saveStorageControl() {
    localStorage.setItem('controlPoints', JSON.stringify(this.controlPoints));
  }

  saveStoragePolygon() {
    localStorage.setItem('polygonPoints', JSON.stringify(this.polygonPoints));
  }

  /******** Control Points *********/
  public createPointsMap(): void {
    this.mapPoint = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [
        this.plaguePlot.plagueLocation.y,
        this.plaguePlot.plagueLocation.x,
      ],
      zoom: 17,
    });

    this.mapPoint.on('click', (e) => {
      const lat = e.lngLat.lat;
      const lng = e.lngLat.lng;
      this.addControlPoints(lng, lat);
    });

    this.createPlaguePoint(
      this.plaguePlot.plagueLocation.y,
      this.plaguePlot.plagueLocation.x
    );
  }

  public createPlaguePoint(lng: number, lat: number): void {
    const marker = new Marker({
      draggable: false,
    })
      .setLngLat([lng, lat])
      .addTo(this.mapPoint);
  }

  public addControlPoints(lng: number, lat: number): void {
    const nvomarker = new Marker({
      draggable: true,
    })
      .setLngLat([lng, lat])
      .addTo(this.mapPoint);
    this.marcador = nvomarker.getLngLat();
    this.controlPoints.push(this.marcador);
    this.saveStorageControl();
  }
  
  /******** Polygon Points *********/
  public createPolygonMap(): void {
    this.mapPolygon = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [
        this.plaguePlot.plagueLocation.y,
        this.plaguePlot.plagueLocation.x,
      ],
      zoom: 17,
    });

    this.mapPolygon.on('click', (e) => {
      const lat = e.lngLat.lat;
      const lng = e.lngLat.lng;
      this.addPolygonPoints(lng, lat);
    });

    this.createPlaguePol(
      this.plaguePlot.plagueLocation.y,
      this.plaguePlot.plagueLocation.x
    );
  }
  public createPlaguePol(lng: number, lat: number): void {
    const marker = new Marker({
      draggable: false,
    })
      .setLngLat([lng, lat])
      .addTo(this.mapPolygon);
  }

  public addPolygonPoints(lng: number, lat: number): void {
    const nvomarker = new Marker({
      draggable: true,
    })
      .setLngLat([lng, lat])
      .addTo(this.mapPolygon);
    this.marcador = nvomarker.getLngLat();
    this.polygonPoints.push(this.marcador);
    this.saveStoragePolygon();
  }

  /*********** Connections **********/
  private getPlaguePlot(): void {
    this.modalsService.loading('Cargando');
    this.plaguePlotService.getPlaguePlot().subscribe({
      next: (response) => {
        this.plaguePlot = response;
        this.modalsService.close();
      },
      error: (error) => error,
    });
  }

}
