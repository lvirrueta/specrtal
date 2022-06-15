import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObservationEntity } from 'src/entities/observation.entity';
import { PlaguePlotEntity } from 'src/entities/plaguePlot.entity';
import { Repository } from 'typeorm';
import { ObservationDTO } from './common/dto/discard.dto';

@Injectable()
export class DiscardService {
  constructor(
    @InjectRepository(PlaguePlotEntity)
    private plaguePlotRepository: Repository<PlaguePlotEntity>,
    @InjectRepository(ObservationEntity)
    private observationRepository: Repository<ObservationEntity>,
  ) {}
  // start controller
  async discard(observacion: ObservationDTO) {
    const ID = observacion.id;
    const PlAGUE_PLOT = await this.findPlaguePlotOneByID(ID);
    if (PlAGUE_PLOT) {
      return await this.setObservation(PlAGUE_PLOT, observacion);
    } else {
      return 'no hay';
    }
  }

  async discardList() {
    return await this.observationRepository.find({
      relations: ['plagePlotID'],
    });
  }

  async updateDiscardPoint(id: number) {
    const OBSERVATION = await this.findObservationById(id);
    this.plaguePlotRepository.save({
      id: OBSERVATION.plagePlotID['id'],
      discart: false,
    });
    this.observationRepository.delete(id);
    return true;
  }
  async deleteDiscardPoint(id: number) {
    const OBSERVATION = await this.findObservationById(id);
    this.observationRepository.delete(id);
    this.plaguePlotRepository.delete(OBSERVATION.plagePlotID['id']);
    return true;
  }
  // end controller

  private async findObservationById(id: number) {
    return await this.observationRepository.findOne({
      relations: ['plagePlotID'],
      where: [
        {
          id: id,
        },
      ],
    });
  }

  private async setObservation(
    plague: PlaguePlotEntity,
    observation: ObservationDTO,
  ): Promise<boolean> {
    plague.discart = true;
    await this.plaguePlotRepository.save({ id: plague.id, discart: true });
    const RESP = await this.observationRepository.save({
      observation: observation.observation,
      plagePlotID: observation.id,
    });
    if (RESP) {
      return true;
    } else {
      return false;
    }
  }

  private async findPlaguePlotOneByID(id: number): Promise<PlaguePlotEntity> {
    return await this.plaguePlotRepository.findOne({
      where: [
        {
          id: id,
        },
      ],
    });
  }
}
