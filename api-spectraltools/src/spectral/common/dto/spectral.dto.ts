import { ApiProperty } from '@nestjs/swagger';

export class SpectralDTO {
  @ApiProperty()
  id: number;
  @ApiProperty({ type: [Number] })
  controlCoord: number[][];
  @ApiProperty({ type: [Number] })
  polygonCoord: number[][];
}
