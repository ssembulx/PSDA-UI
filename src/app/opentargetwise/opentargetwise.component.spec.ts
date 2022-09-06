import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpentargetwiseComponent } from './opentargetwise.component';

describe('OpentargetwiseComponent', () => {
  let component: OpentargetwiseComponent;
  let fixture: ComponentFixture<OpentargetwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpentargetwiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpentargetwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
