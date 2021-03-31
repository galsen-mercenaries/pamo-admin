import { TestBed } from '@angular/core/testing';

import { AutresService } from './autres.service';

describe('AutresService', () => {
  let service: AutresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
