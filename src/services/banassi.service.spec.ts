import { TestBed } from '@angular/core/testing';

import { BanassiService } from './banassi.service';

describe('BanassiService', () => {
  let service: BanassiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BanassiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
