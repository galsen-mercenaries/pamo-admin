import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePrestataireComponent } from './delete-prestataire.component';

describe('DeletePrestataireComponent', () => {
  let component: DeletePrestataireComponent;
  let fixture: ComponentFixture<DeletePrestataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePrestataireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePrestataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
