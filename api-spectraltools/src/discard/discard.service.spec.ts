import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObservationEntity } from '../entities/observation.entity';
import { PlaguePlotEntity } from '../entities/plaguePlot.entity';
import { Repository } from 'typeorm';
import { DiscardService } from './discard.service';

describe('DiscardService', () => {
  let service: DiscardService;
  let plaguePlotRepository: Repository<PlaguePlotEntity>;
  let observationRepository: Repository<ObservationEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiscardService,
        {
          provide: getRepositoryToken(PlaguePlotEntity),
          useValue: {
            findOne: jest.fn().mockImplementation(() => {
              return {
                hola: 'ass',
              };
            }),
          },
        },
        {
          provide: getRepositoryToken(ObservationEntity),
          useValue: {
            find: jest.fn().mockImplementation(() => {
              return [
                {
                  id: 60,
                  observation: 'plaga en tierra',
                  plagePlotID: {
                    id: 22,
                    plagueLocation: {
                      x: 19.89174,
                      y: -101.37478,
                    },
                    sampleDate: '2021-06-06T05:00:00.000Z',
                    phenologicalStage: 'DESARROLLO VEGETATIVO',
                    damagePercentage: 18,
                    cropMonthAge: 6,
                    cropWeekAge: 23,
                    plagueSign: null,
                    phenologicalSign: null,
                    plaguePixel: null,
                    controlPixel: null,
                    discart: true,
                  },
                },
              ];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<DiscardService>(DiscardService);
    plaguePlotRepository = module.get<Repository<PlaguePlotEntity>>(
      getRepositoryToken(PlaguePlotEntity),
    );
    observationRepository = module.get<Repository<ObservationEntity>>(
      getRepositoryToken(ObservationEntity),
    );
  });

  it('plaguePlotRepository should be defined', () => {
    expect(plaguePlotRepository).toBeDefined();
  });

  it('observationRepository should be defined', () => {
    expect(observationRepository).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a list of discarted', async () => {
    expect(await service.discardList()).toEqual([
      {
        id: 60,
        observation: 'plaga en tierra',
        plagePlotID: {
          id: 22,
          plagueLocation: {
            x: 19.89174,
            y: -101.37478,
          },
          sampleDate: '2021-06-06T05:00:00.000Z',
          phenologicalStage: 'DESARROLLO VEGETATIVO',
          damagePercentage: 18,
          cropMonthAge: 6,
          cropWeekAge: 23,
          plagueSign: null,
          phenologicalSign: null,
          plaguePixel: null,
          controlPixel: null,
          discart: true,
        },
      },
    ]);
  });
});
