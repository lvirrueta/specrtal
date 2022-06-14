import { Test, TestingModule } from '@nestjs/testing';
import { SpectralService } from './spectral.service';

describe('SpectralService', () => {
  let service: SpectralService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpectralService],
    }).compile();

    service = module.get<SpectralService>(SpectralService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
