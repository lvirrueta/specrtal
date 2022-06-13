import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PlaguePlotService } from './plague-plot.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('plaguePlot')
@Controller('plague-plot')
export class PlaguePlotController {
  constructor(private plaguePlotServie: PlaguePlotService) {}
  @ApiOperation({
    summary: 'Obtiene Plague Plot',
  })
  @ApiResponse({
    status: 200,
    description: 'Si todo sale bien regresa informacion de la parcela',
    isArray: false,
    type: Boolean,
  })
  @Get('toSign')
  login() {
    return this.plaguePlotServie.getOnePlaguePlot();
  }
}
