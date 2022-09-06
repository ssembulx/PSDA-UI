import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformOnboardingComponent } from './platform-onboarding.component';

describe('PlatformOnboardingComponent', () => {
  let component: PlatformOnboardingComponent;
  let fixture: ComponentFixture<PlatformOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformOnboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
