import { TestBed } from '@angular/core/testing';

import { ErrorsInterceptor } from './errors.interceptor';

describe('ErrorsInterceptor', () => {
  let service: ErrorsInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorsInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
