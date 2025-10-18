import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { RideService } from '../../services/ride.service';
import { Ride } from '../../models/ride.model';

@Component({
  selector: 'app-add-ride',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.css'],
})
export class AddRideComponent implements OnInit {
  @Output() rideAdded = new EventEmitter<void>();

  form!: FormGroup;
  successMsg = '';
  errorMsg = '';

  constructor(private fb: FormBuilder, private rideService: RideService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      ownerEmployeeId: ['', Validators.required],
      vehicleType: ['Car', Validators.required],
      vehicleNo: ['', Validators.required],
      vacantSeats: [1, [Validators.required, Validators.min(1)]],
      time: ['', Validators.required],
      pickupPoint: ['', Validators.required],
      destination: ['', Validators.required],
    });
  }

  addRide() {
    this.errorMsg = this.successMsg = '';

    if (this.form.invalid) {
      this.errorMsg = 'Please fill in all required fields.';
      return;
    }

    const {
      ownerEmployeeId,
      vehicleType,
      vehicleNo,
      vacantSeats,
      time,
      pickupPoint,
      destination,
    } = this.form.value;
    const today = new Date().toISOString().slice(0, 10);

    if (this.rideService.ownerHasRideToday(ownerEmployeeId!)) {
      this.errorMsg = 'You have already added a ride for today.';
      return;
    }

    const newRide: Ride = {
      id: Date.now().toString(),
      ownerEmployeeId: ownerEmployeeId!,
      vehicleType: vehicleType as 'Car' | 'Bike',
      vehicleNo: vehicleNo!,
      vacantSeats: Number(vacantSeats),
      time: time!,
      pickupPoint: pickupPoint!,
      destination: destination!,
      bookedEmployeeIds: [],
      date: today,
    };

    this.rideService.addRide(newRide);
    this.form.reset({ vehicleType: 'Car', vacantSeats: 1 });
    this.successMsg = 'Ride added successfully!';
    this.rideAdded.emit();
  }
}
