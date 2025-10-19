import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ride } from '../../models/ride.model';
import { RideService } from '../../services/ride.service';
import { PickRideComponent } from '../pick-ride/pick-ride.component';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ride-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PickRideComponent],
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.css'],
})
export class RideListComponent implements OnInit {
  rides: Ride[] = [];
  selectedRide: Ride | null = null;
  filterForm!: FormGroup;

  constructor(private rideService: RideService, private fb: FormBuilder) {}

  ngOnInit() {
    this.filterForm = this.fb.group({
      vehicleType: [''],
      referenceTime: [''],
    });

    this.refresh();
    this.rideService.rides$.subscribe(() => this.refresh());
  }

  refresh() {
    const time = this.filterForm.value.referenceTime || this.getCurrentTime();
    const type = this.filterForm.value.vehicleType || '';
    const rides = this.rideService.filterByVehicleType(
      this.rideService.getRidesWithinBuffer(time),
      type as any
    );
    this.rides = rides;
    this.selectedRide = null;
  }

  getCurrentTime(): string {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  }

  selectRide(r: Ride) {
    this.selectedRide = r;
  }
}
