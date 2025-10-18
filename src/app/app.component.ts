import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddRideComponent } from './components/add-ride/add-ride.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddRideComponent],
  template: ` <h1>Transport Facility Management</h1>
    <app-add-ride></app-add-ride>`,
  styleUrl: './app.component.css',
})
export class AppComponent {}
