import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaguePlotEntity } from 'src/entities/plaguePlot.entity';
import { Repository } from 'typeorm';
import { CEspectral } from './common/class/spectral.class';
import { SpectralDTO } from './common/dto/spectral.dto';

@Injectable()
export class SpectralService {
  private url = 'http://localhost:3000/auth/signIn';
  constructor(
    @InjectRepository(PlaguePlotEntity)
    private plaguePlotRepository: Repository<PlaguePlotEntity>,
    private httpService: HttpService,
  ) {}
  async spectral(spectral: SpectralDTO) {
    const plague = await this.findOneById(spectral.id);
    const spectralSign = this.spectraSignAssign(plague, spectral);
    return await this.redirectToSign(spectralSign);
  }

  private async redirectToSign(spectral: CEspectral) {
    let resp: any;
    this.httpService.post(this.url, spectral).subscribe({
      next: (response) => {
        console.log(response.data);
        return response;
      },
      error: (error) => {
        console.log(error);
        return error;
      },
    });
    return await resp;
  }

  private spectraSignAssign(
    plague: PlaguePlotEntity,
    spectral: SpectralDTO,
  ): CEspectral {
    const spectralSign = new CEspectral();
    spectralSign.produd = 'sentinel-2';
    spectralSign.start_date = plague.sampleDate.toJSON().slice(0, -14);
    spectralSign.idPlot = plague.id;
    spectralSign.poligonCoord = this.assignGeoJson(spectral);
    spectralSign.controlCoord = this.assignCoordinateArray(
      spectral.controlCoord,
    );
    spectralSign.plagueCoord = this.assignCoordinates(plague);
    return spectralSign;
  }

  private assignGeoJson(spectral: SpectralDTO): string {
    let coordS = '';
    for (const coord of spectral.polygonCoord) {
      coordS += `[${coord[1]}, ${coord[0]}],`;
    }
    coordS = coordS.slice(0, -1);
    const geoJson = `{"type":"Polygon","coordinates":[[ ${coordS} ]]}`;
    return geoJson;
  }

  private assignCoordinateArray(coords: number[][]): string {
    let coordString = '';
    for (const coord of coords) {
      coordString += `${coord[1]}, ${coord[0]},`;
    }
    return coordString.slice(0, -1);
  }

  private assignCoordinates(plague: PlaguePlotEntity): string {
    const lon = plague.plagueLocation['y']; //-101
    const lat = plague.plagueLocation['x']; //19
    const coord = `${lon}, ${lat}`;
    return coord;
  }

  private async findOneById(id: number): Promise<PlaguePlotEntity> {
    return await this.plaguePlotRepository.findOne({
      where: [
        {
          id: id,
        },
      ],
    });
  }
}
