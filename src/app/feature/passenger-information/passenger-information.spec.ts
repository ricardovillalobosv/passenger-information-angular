import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerInformation } from './passenger-information';

describe('PassengerInformation', () => {
  let component: PassengerInformation;
  let fixture: ComponentFixture<PassengerInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerInformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerInformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
