import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysDomainDebugComponent } from './days-domain-debug.component';

describe('DaysDomainDebugComponent', () => {
  let component: DaysDomainDebugComponent;
  let fixture: ComponentFixture<DaysDomainDebugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaysDomainDebugComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysDomainDebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
