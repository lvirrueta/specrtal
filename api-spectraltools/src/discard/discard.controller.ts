import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CObservation } from './common/class/observation.class';
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

  @ApiOperation({
    summary: 'Obtienes los puntos descartados',
  })
  @ApiResponse({
    status: 200,
    description: 'Obtiene los puntos descartados',
    isArray: true,
    type: CObservation,
  })
  @Get('discard-list')
  async discardList() {
    return await this.discardService.discardList();
  }
  @Put('udpdate-discard-point/:id')
  async updateDiscardPoint(@Param('id') id: number) {
    return await this.discardService.updateDiscardPoint(id);
  }
  @Delete('delete-discard-point/:id')
  async deleteDiscardPoint(@Param('id') id: number) {
    return await this.discardService.deleteDiscardPoint(id);
  }
}
