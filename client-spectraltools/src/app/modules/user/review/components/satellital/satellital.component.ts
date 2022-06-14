import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';
import { PointsInterface } from '../../../interfaces/pointsInfo.interface';
import { ModalsService } from '../../../../../shared/services/modals/modals.service';
import { PlaguePlotService } from '../../../../../core/services/plaguePlot.service';
import { IPlaguePlot } from '../../../../../core/models/IPlaguePlot';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

@Component({
  selector: 'app-satellital',
  templateUrl: './satellital.component.html',
  styleUrls: ['./satellital.component.scss'],
})
export class SatellitalComponent implements OnInit {
  
  public plaguePlot!: IPlaguePlot;
  
  marcadores: PointsInterface[] = [];
  marcador: PointsInterface = {
    lat: 0,
    lng: 0
  };
  map!: Map;
  draw!: MapboxDraw;

  @ViewChild('mapDiv')
    mapDivElement!: ElementRef;

  constructor(
    private modalsService: ModalsService,
    private plaguePlotService: PlaguePlotService
  ) {
    // console.log(this.marcadores);
    
  }

  ngOnInit(): void {
    this.modalsService.loading(
      'Cargando'
    );
    this.getPlaguePlot();
  }

  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify( this.marcadores ) );
  }

  public createMap(): void {
    this.modalsService.close();
    this.map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [this.plaguePlot.plagueLocation.y, this.plaguePlot.plagueLocation.x],
      zoom: 17,
    });

    this.map.on('click', (e) => {
      const lat = e.lngLat.lat;
      const lng = e.lngLat.lng;
      this.agregarMarcador(lng,lat);
    });

    this.createMarker(this.plaguePlot.plagueLocation.y, this.plaguePlot.plagueLocation.x);
  }

  private getPlaguePlot(): void {
    this.plaguePlotService.getPlaguePlot().subscribe({
      next: (response) => {
        this.plaguePlot = response;
        this.createMap();
      },
      error: (error) => error,
    });
  }

  public createMarker(lng: number, lat: number): void {
    const marker = new Marker({
      draggable: false,
    })
      .setLngLat([lng, lat])
      .addTo(this.map);
  }

  public agregarMarcador(lng: number, lat: number): void {
    const nvomarker = new Marker({
      draggable: true,
    })
      .setLngLat([lng, lat])
      .addTo(this.map);
    this.marcador = nvomarker.getLngLat();
    this.marcadores.push(this.marcador);
  }

  public drawPolygon() {
    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      },
      defaultMode: 'draw_polygon'
    });

    this.map.addControl(this.draw);

    this.map.on('draw.create', this.updateArea);
    this.map.on('draw.delete', this.updateArea);
    this.map.on('draw.update', this.updateArea);
  }

  public updateArea(e: any) {
    const data = this.draw.getAll();
    const answer = document.getElementById('calculated-area');
    // if (data.features.length > 0) {
    //   const area = turf.area(data);
    //   const rounded_area = Math.round(area * 100 ) / 100;
    //   answer?.innerHTML = `<p><strong>${rounded_area}</strong></p>
    //                       <p>square meters</p>`;
    // } else {
    //   answer?.innerHTML = '';
    //   if (e.type !== 'draw.delete')
    //     alert('Click the map to draw a polygon.');
    // }
  }


}
