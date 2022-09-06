import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramMgmtComponent } from './program-mgmt.component';

describe('ProgramMgmtComponent', () => {
  let component: ProgramMgmtComponent;
  let fixture: ComponentFixture<ProgramMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramMgmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
