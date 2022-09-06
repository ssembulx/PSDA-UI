import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentMappedComponent } from './component-mapped.component';

describe('ComponentMappedComponent', () => {
  let component: ComponentMappedComponent;
  let fixture: ComponentFixture<ComponentMappedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentMappedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentMappedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
