import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysdomainComponent } from './daysdomain.component';

describe('DaysdomainComponent', () => {
  let component: DaysdomainComponent;
  let fixture: ComponentFixture<DaysdomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaysdomainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysdomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
