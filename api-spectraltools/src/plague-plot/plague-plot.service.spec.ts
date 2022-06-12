import { Test, TestingModule } from '@nestjs/testing';
import { PlaguePlotService } from './plague-plot.service';

describe('PlaguePlotService', () => {
  let service: PlaguePlotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaguePlotService],
    }).compile();

    service = module.get<PlaguePlotService>(PlaguePlotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
