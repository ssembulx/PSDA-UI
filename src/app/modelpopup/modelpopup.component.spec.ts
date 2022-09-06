import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelpopupComponent } from './modelpopup.component';

describe('ModelpopupComponent', () => {
  let component: ModelpopupComponent;
  let fixture: ComponentFixture<ModelpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelpopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
