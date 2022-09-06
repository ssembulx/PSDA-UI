import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpendomainwiseComponent } from './opendomainwise.component';

describe('OpendomainwiseComponent', () => {
  let component: OpendomainwiseComponent;
  let fixture: ComponentFixture<OpendomainwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpendomainwiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpendomainwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
