import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningredientwiseComponent } from './openingredientwise.component';

describe('OpeningredientwiseComponent', () => {
  let component: OpeningredientwiseComponent;
  let fixture: ComponentFixture<OpeningredientwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpeningredientwiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningredientwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
