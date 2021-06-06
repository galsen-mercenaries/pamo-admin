import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsFormulaireComponent } from './items-formulaire.component';

describe('ItemsFormulaireComponent', () => {
  let component: ItemsFormulaireComponent;
  let fixture: ComponentFixture<ItemsFormulaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsFormulaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
