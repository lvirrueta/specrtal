import { ApiProperty } from '@nestjs/swagger';

export class CVarietyProduct {
  @ApiProperty()
  id: number;
  @ApiProperty()
  varietyName: string;
}
