import { ApiProperty } from '@nestjs/swagger';

export class CloginToken {
  @ApiProperty()
  access_token: string;
}
