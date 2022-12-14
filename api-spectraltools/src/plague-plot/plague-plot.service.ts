import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaguePlotEntity } from 'src/entities/plaguePlot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlaguePlotService {
  constructor(
    @InjectRepository(PlaguePlotEntity)
    private plaguePlotRepository: Repository<PlaguePlotEntity>,
  ) {}
  async getOnePlaguePlot() {
    const a = await this.plaguePlotRepository.find({
      relations: ['varietyProductID', 'plagueID'],
      where: [
        {
          discart: false,
          phenologicalSign: null,
          plagueSign: null,
        },
      ],
    });
    return a[0];
  }
}
