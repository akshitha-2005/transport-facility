import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRideComponent } from './components/add-ride/add-ride.component';
import { RideListComponent } from './components/ride-list/ride-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AddRideComponent, RideListComponent],
  template: `
    <div class="container">
      <h1>Transport Facility Management</h1>
      <div class="grid">
        <section class="box">
          <h2>Add Ride</h2>
          <app-add-ride (rideAdded)="onRideAdded()"></app-add-ride>
        </section>
        <section class="box">
          <h2>Available Rides</h2>
          <app-ride-list></app-ride-list>
        </section>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 1000px;
        margin: 0 auto;
        font-family: Arial;
        padding: 20px;
      }
      .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      .box {
        background: #fff;
        border-radius: 8px;
        padding: 12px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      }
      h1 {
        text-align: center;
        margin-bottom: 16px;
      }
      @media (max-width: 800px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class AppComponent {
  onRideAdded() {}
}
