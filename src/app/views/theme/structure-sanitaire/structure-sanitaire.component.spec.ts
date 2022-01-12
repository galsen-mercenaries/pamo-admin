import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureSanitaireComponent } from './structure-sanitaire.component';

describe('StructureSanitaireComponent', () => {
  let component: StructureSanitaireComponent;
  let fixture: ComponentFixture<StructureSanitaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureSanitaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureSanitaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
