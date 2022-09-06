import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentUnmappedComponent } from './component-unmapped.component';

describe('ComponentUnmappedComponent', () => {
  let component: ComponentUnmappedComponent;
  let fixture: ComponentFixture<ComponentUnmappedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentUnmappedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentUnmappedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
