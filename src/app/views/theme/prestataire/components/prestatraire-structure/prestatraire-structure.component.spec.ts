import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestatraireStructureComponent } from './prestatraire-structure.component';

describe('PrestatraireStructureComponent', () => {
  let component: PrestatraireStructureComponent;
  let fixture: ComponentFixture<PrestatraireStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestatraireStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestatraireStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
