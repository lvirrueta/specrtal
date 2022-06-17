import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Map, Marker } from 'mapbox-gl';
import { PointsInterface } from 'src/app/modules/user/interfaces/pointsInfo.interface';
import { ModalsService } from 'src/app/shared/services/modals/modals.service';
import { PlaguePlotService } from 'src/app/core/services/plaguePlot.service';
import { IPlaguePlot } from 'src/app/core/models/IPlaguePlot';

@Component({
  selector: 'app-satellital',
  templateUrl: './satellital.component.html',
  styleUrls: ['./satellital.component.scss'],
})
export class SatellitalComponent implements OnInit {
  @Output() pointOutput = new EventEmitter<PointsInterface>();
  @Output() polygonOutput = new EventEmitter<PointsInterface>();

  public plaguePlot!: IPlaguePlot;
  public controlPoints: PointsInterface[] = [];
  public polygonPoints: PointsInterface[] = [];
  controlPointsLS: string | null | undefined;
  controlPolygonLS: string | null | undefined;
  point: PointsInterface = {
    lat: 0,
    lng: 0,
  };
  mapPoint!: Map;
  mapPolygon!: Map;
  markersPoints: Marker[] = [];
  markersPolygon: Marker[] = [];

  @ViewChild('mapDiv')
    mapDivElement!: ElementRef;

  constructor(
    private modalsService: ModalsService,
    private plaguePlotService: PlaguePlotService
  ) {}

  ngOnInit(): void {
    this.getPlaguePlot();
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
    const newMarker = new Marker({
      draggable: true,
    })
      .setLngLat([lng, lat])
      .addTo(this.mapPoint);
    this.point = newMarker.getLngLat();
    this.controlPoints.push(this.point);
    this.pointOutput.emit(this.point);
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
    const newMarker = new Marker({
      draggable: true,
    })
      .setLngLat([lng, lat])
      .addTo(this.mapPolygon);
    this.point = newMarker.getLngLat();
    this.polygonPoints.push(this.point);
    this.polygonOutput.emit(this.point);
  }

  /*********** Connections **********/
  private getPlaguePlot(): void {
    this.modalsService.loadingModal('Cargando');
    this.plaguePlotService.getPlaguePlot().subscribe({
      next: (response) => {
        this.plaguePlot = response;
        this.modalsService.close();
        this.createPolygonMap();
      },
      error: (error) => error,
    });
  }
}
