import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CEspectral } from './common/class/spectral.class';
import { SpectralDTO } from './common/dto/spectral.dto';
import { SpectralService } from './spectral.service';

@ApiTags('Spectral')
@Controller('spectral')
export class SpectralController {
  constructor(private spectralService: SpectralService) {}
  @ApiOperation({
    summary: 'Redirige los puntos para firmar',
  })
  @ApiResponse({
    status: 200,
    description: 'si todo sale bien, guarda la info',
    isArray: false,
    type: CEspectral,
  })
  @Post('spectral')
  async spectral(@Body() coord: SpectralDTO) {
    return await this.spectralService.spectral(coord);
  }
}
