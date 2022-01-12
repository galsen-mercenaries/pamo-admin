import { TestBed } from '@angular/core/testing';

import { StructureSanitaireService } from './structure-sanitaire.service';

describe('StructureSanitaireServiceService', () => {
  let service: StructureSanitaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StructureSanitaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
