import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonControl } from './radio-button-control';

describe('RadioButtonControl', () => {
  let component: RadioButtonControl;
  let fixture: ComponentFixture<RadioButtonControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioButtonControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioButtonControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
