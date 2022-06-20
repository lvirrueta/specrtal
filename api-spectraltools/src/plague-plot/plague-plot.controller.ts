import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CPlagePlotID } from './common/class/plaguePlot.class';
import { CPlagePlotData } from './common/class/plaguePlotData.class';
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
    type: CPlagePlotID,
  })
  @Get('toSign')
  login() {
    return this.plaguePlotServie.getOnePlaguePlot();
  }

  @ApiOperation({
    summary: 'Obtiene informacion de los datos a analizar',
  })
  @ApiResponse({
    status: 200,
    description: 'Si todo sale bien regresa informacion de los datos',
    isArray: false,
    type: CPlagePlotData,
  })
  @Get('getInfoPlot')
  getInfoPlot() {
    return this.plaguePlotServie.getInfoPlot();
  }
}
