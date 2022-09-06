import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighDefectComponent } from './high-defect.component';

describe('HighDefectComponent', () => {
  let component: HighDefectComponent;
  let fixture: ComponentFixture<HighDefectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighDefectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighDefectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
