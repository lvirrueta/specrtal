import { TestBed } from '@angular/core/testing';

import { ScssConectionService } from './scss-conection.service';

describe('ScssConectionService', () => {
  let service: ScssConectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScssConectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
