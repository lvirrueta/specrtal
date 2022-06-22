import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaguePlotEntity } from 'src/entities/plaguePlot.entity';
import { Repository } from 'typeorm';
import { CPlagePlotData } from './common/class/plaguePlotData.class';

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

  async getInfoPlot() {
    const plaguePlot = await this.plaguePlotRepository.find();
    const plaguePlotData = new CPlagePlotData();
    let descarted = 0;
    plaguePlot.forEach((element) => {
      if (element.discart === true) {
        descarted++;
      }
    });

    let analized = 0;
    plaguePlot.forEach((element) => {
      if (element.plagueSign != null || element.phenologicalSign != null) {
        analized++;
      }
    });

    plaguePlotData.discarted = descarted;
    plaguePlotData.toAnalize = plaguePlot.length - descarted - analized;
    plaguePlotData.analized = analized;
    return plaguePlotData;
  }

  async getProcessByProduct() {
    const a = await this.plaguePlotRepository.find({
      relations: ['varietyProductID.agriculturalProductID', 'plagueID'],
      where: [{ discart: false }],
    });

    return a;
  }
}
