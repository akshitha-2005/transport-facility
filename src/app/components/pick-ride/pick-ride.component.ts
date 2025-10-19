import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Ride } from '../../models/ride.model';
import { RideService } from '../../services/ride.service';

@Component({
  selector: 'app-pick-ride',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pick-ride.component.html',
})
export class PickRideComponent implements OnInit {
  @Input() ride!: Ride;
  @Output() booked = new EventEmitter<void>();

  form!: FormGroup;
  message = '';
  error = '';

  constructor(private fb: FormBuilder, private rideService: RideService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      employeeId: ['', Validators.required],
    });
  }

  bookRide() {
    this.message = this.error = '';
    if (this.form.invalid) {
      this.error = 'Employee ID required.';
      return;
    }

    const empId = this.form.value.employeeId!;
    const result = this.rideService.bookRide(this.ride.id, empId);

    if (result) {
      this.error = result;
    } else {
      this.message = 'Ride booked successfully!';
      this.booked.emit();
      this.form.reset();
    }
  }
}
