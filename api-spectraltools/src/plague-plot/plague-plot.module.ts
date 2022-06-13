import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaguePlotEntity } from 'src/entities/plaguePlot.entity';
import { PlaguePlotController } from './plague-plot.controller';
import { PlaguePlotService } from './plague-plot.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlaguePlotEntity])],
  controllers: [PlaguePlotController],
  providers: [PlaguePlotService],
})
export class PlaguePlotModule {}
