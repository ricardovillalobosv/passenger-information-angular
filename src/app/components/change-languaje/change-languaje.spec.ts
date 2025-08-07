import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLanguaje } from './change-languaje';

describe('ChangeLanguaje', () => {
  let component: ChangeLanguaje;
  let fixture: ComponentFixture<ChangeLanguaje>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeLanguaje]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeLanguaje);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
