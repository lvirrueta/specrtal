import { ApiProperty } from '@nestjs/swagger';

export class CEspectral {
  @ApiProperty()
  produd: string;
  @ApiProperty()
  start_date: string;
  @ApiProperty()
  idPlot: number;
  @ApiProperty()
  poligonCoord: string;
  @ApiProperty()
  controlCoord: string;
  @ApiProperty()
  plagueCoord: string;
}

export class Polygon {
  @ApiProperty()
  type: string;
  @ApiProperty()
  coordinates: Array<Array<number[]>>;
}
