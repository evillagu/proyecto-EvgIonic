import { TestBed } from '@angular/core/testing';

import { FromProducService } from './from-produc.service';

describe('FromProducService', () => {
  let service: FromProducService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FromProducService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
