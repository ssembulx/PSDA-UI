import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcHSDESComponent } from './qrc-hsdes.component';

describe('QrcHSDESComponent', () => {
  let component: QrcHSDESComponent;
  let fixture: ComponentFixture<QrcHSDESComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrcHSDESComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcHSDESComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
