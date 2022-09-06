import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighQRCComponent } from './high-qrc.component';

describe('HighQRCComponent', () => {
  let component: HighQRCComponent;
  let fixture: ComponentFixture<HighQRCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighQRCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighQRCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
