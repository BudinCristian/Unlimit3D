import { TestBed } from '@angular/core/testing';

import { ShaperService } from './shaper.service';

describe('ShaperService', () => {
  let service: ShaperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShaperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
