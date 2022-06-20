import { ApiProperty } from '@nestjs/swagger';

export class CPlagePlotData {
  @ApiProperty()
  analized: number;
  @ApiProperty()
  discarted: number;
  @ApiProperty()
  toAnalize: number;
}
