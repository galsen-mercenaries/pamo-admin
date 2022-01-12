import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrestataireStructureComponent } from './add-prestataire-structure.component';

describe('PrestataireStructureComponent', () => {
  let component: AddPrestataireStructureComponent;
  let fixture: ComponentFixture<AddPrestataireStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPrestataireStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrestataireStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
