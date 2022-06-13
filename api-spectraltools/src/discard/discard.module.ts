import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObservationEntity } from 'src/entities/observation.entity';
import { PlaguePlotEntity } from 'src/entities/plaguePlot.entity';
import { DiscardController } from './discard.controller';
import { DiscardService } from './discard.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlaguePlotEntity, ObservationEntity])],
  controllers: [DiscardController],
  providers: [DiscardService],
})
export class DiscardModule {}
