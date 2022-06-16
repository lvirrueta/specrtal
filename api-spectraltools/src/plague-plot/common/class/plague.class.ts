import { ApiProperty } from '@nestjs/swagger';

export class CPlague {
  @ApiProperty()
  id: number;
  @ApiProperty()
  scientificName: string;
  @ApiProperty()
  commonNames: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  minTemperature: number;
  @ApiProperty()
  maxTemperature: number;
  @ApiProperty()
  optTemperature: number;
}
