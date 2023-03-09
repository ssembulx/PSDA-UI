import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingPlatformComponent } from './onboarding-platform.component';

describe('OnboardingPlatformComponent', () => {
  let component: OnboardingPlatformComponent;
  let fixture: ComponentFixture<OnboardingPlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingPlatformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
