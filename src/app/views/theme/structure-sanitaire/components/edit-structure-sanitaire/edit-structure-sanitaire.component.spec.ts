import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStructureSanitaireComponent } from './edit-structure-sanitaire.component';

describe('EditStructureSanitaireComponent', () => {
  let component: EditStructureSanitaireComponent;
  let fixture: ComponentFixture<EditStructureSanitaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStructureSanitaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStructureSanitaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
