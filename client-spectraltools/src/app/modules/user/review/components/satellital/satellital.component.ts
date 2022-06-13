import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';
import { PointsInterface } from '../../../interfaces/pointsInfo.interface';
import { ModalsService } from '../../../../../shared/services/modals/modals.service';
import { PlaguePlotService } from '../../../../../core/services/plaguePlot.service';
import { IPlaguePlot } from '../../../../../core/models/IPlaguePlot';

@Component({
  selector: 'app-satellital',
  templateUrl: './satellital.component.html',
  styleUrls: ['./satellital.component.scss'],
})
export class SatellitalComponent implements OnInit {
  
  public plaguePlot!: IPlaguePlot;
  
  marcadores: PointsInterface[] = [];
  map!: Map;

  @ViewChild('mapDiv')
    mapDivElement!: ElementRef;

  constructor(
    private modalService: ModalsService,
    private plaguePlotService: PlaguePlotService
  ) {}

  ngOnInit(): void {
    this.getPlaguePlot();
    console.log('init');
  }

  public createMap(): void {
    // if (!this.userLocation )

    
    this.map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [this.plaguePlot.plagueLocation.y, this.plaguePlot.plagueLocation.x],
      zoom: 17,
    });

    this.createMarker(this.plaguePlot.plagueLocation.y, this.plaguePlot.plagueLocation.x);
    console.log(this.marcadores);
  }

  private getPlaguePlot(): void {
    this.plaguePlotService.getPlaguePlot().subscribe({
      next: (response) => {
        this.plaguePlot = response;
        this.createMap();
        console.log('getplot');
      },
      error: (error) => error,
    });
  }


  public createMarker(lng: number, lat: number) {
    const marker = new Marker({
      draggable: true,
    })
      .setLngLat([lng, lat])
      .addTo(this.map);
  }

  public agregarMarcador() {
    const nvoMarker = new Marker({
      draggable: true,
    })
      .setLngLat([this.plaguePlot.plagueLocation.y, this.plaguePlot.plagueLocation.x])
      .addTo(this.map);

    nvoMarker.setDraggable(true);

    nvoMarker.on('drag', () => {
      return this.marcadores.push(nvoMarker.getLngLat());
    });
  }
}
