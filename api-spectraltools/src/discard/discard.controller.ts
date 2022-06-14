import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ObservationDTO } from './common/dto/discard.dto';
import { DiscardService } from './discard.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Discard')
@Controller('discard')
export class DiscardController {
  constructor(private discardService: DiscardService) {}
  @ApiOperation({
    summary: 'Descarta los puntos',
  })
  @ApiResponse({
    status: 200,
    description: 'si todo sale bien, agrega descripcion al punto',
    isArray: false,
    type: Boolean,
  })
  @Post('discard')
  async discard(@Body() observacion: ObservationDTO) {
    return await this.discardService.discard(observacion);
  }
}
