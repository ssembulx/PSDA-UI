import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDomainDebugComponent } from './open-domain-debug.component';

describe('OpenDomainDebugComponent', () => {
  let component: OpenDomainDebugComponent;
  let fixture: ComponentFixture<OpenDomainDebugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenDomainDebugComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDomainDebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
