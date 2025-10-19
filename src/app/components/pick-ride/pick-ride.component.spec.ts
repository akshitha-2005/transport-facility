import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickRideComponent } from './pick-ride.component';

describe('PickRideComponent', () => {
  let component: PickRideComponent;
  let fixture: ComponentFixture<PickRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickRideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
