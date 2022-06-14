import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaguePlotEntity } from 'src/entities/plaguePlot.entity';
import { SpectralController } from './spectral.controller';
import { SpectralService } from './spectral.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlaguePlotEntity]), HttpModule],
  controllers: [SpectralController],
  providers: [SpectralService],
})
export class SpectralModule {}
