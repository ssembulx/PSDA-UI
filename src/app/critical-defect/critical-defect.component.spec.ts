import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalDefectComponent } from './critical-defect.component';

describe('CriticalDefectComponent', () => {
  let component: CriticalDefectComponent;
  let fixture: ComponentFixture<CriticalDefectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriticalDefectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticalDefectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
