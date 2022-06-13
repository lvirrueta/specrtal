import { ApiProperty } from '@nestjs/swagger';

export class ObservationDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  observation: string;
}
