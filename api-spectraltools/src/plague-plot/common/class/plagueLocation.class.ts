import { ApiProperty } from '@nestjs/swagger';

export class CPlagueLocation {
  @ApiProperty()
  x: number;
  @ApiProperty()
  y: number;
}
