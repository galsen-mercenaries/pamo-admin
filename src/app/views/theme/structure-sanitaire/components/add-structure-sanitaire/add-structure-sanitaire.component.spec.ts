import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStructureSanitaireComponent } from './add-structure-sanitaire.component';

describe('AddStructureSanitaireComponent', () => {
  let component: AddStructureSanitaireComponent;
  let fixture: ComponentFixture<AddStructureSanitaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStructureSanitaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStructureSanitaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
