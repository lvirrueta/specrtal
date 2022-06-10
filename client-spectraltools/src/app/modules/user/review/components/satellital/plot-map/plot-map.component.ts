import { Component } from '@angular/core';

@Component({
  selector: 'app-plot-map',
  templateUrl: './plot-map.component.html',
  styleUrls: ['./plot-map.component.scss']
})
export class PlotMapComponent {

  // Map variables
  private colorScale = {
    lineCapStroke: '#FFFFFF',
    mainColor: '#FF00FF',
    transparentMainColor: '#FF00FF0F'
  };
  private MAPSTYLE = "satellite-v9";
  // eslint-disable-next-line max-len
  private BASEMAPURL = `https://api.mapbox.com/styles/v1/mapbox/${this.MAPSTYLE}/tiles/256/{z}/{x}/{y}@2x?access_token=${environment.mapboxApiKey}`;
  private vectorLayer = new TileLayer({ source: new OSM() });
  private satellitalLayer = new TileLayer({ source: new XYZ({ url: this.BASEMAPURL }) });
  public view = new View({
    center: transform([ -101.19487899073899, 19.67903900399413 ], 'EPSG:4326', 'EPSG:3857'),
    zoom: 13,
    minZoom: 10,
    maxZoom: 23,
  });
  private poligon: Feature<Geometry> | null = null;

  constructor() { }

}
