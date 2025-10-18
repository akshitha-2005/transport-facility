import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ride, VehicleType } from '../models/ride.model';

@Injectable({ providedIn: 'root' })
export class RideService {
  private STORAGE_KEY = 'transport_facility_rides';
  private ridesSubject = new BehaviorSubject<Ride[]>(this.load());
  rides$ = this.ridesSubject.asObservable();

  private load(): Ride[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  private save(rides: Ride[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(rides));
    this.ridesSubject.next(rides);
  }

  getAll(): Ride[] {
    return [...this.ridesSubject.value];
  }

  addRide(ride: Ride) {
    const rides = this.getAll();
    rides.push(ride);
    this.save(rides);
  }

  updateRide(updated: Ride) {
    const rides = this.getAll().map((r) => (r.id === updated.id ? updated : r));
    this.save(rides);
  }

  bookRide(rideId: string, employeeId: string): string | null {
    const rides = this.getAll();
    const ride = rides.find((r) => r.id === rideId);
    if (!ride) return 'Ride not found';
    if (ride.ownerEmployeeId === employeeId)
      return 'You cannot book your own ride';
    if (ride.bookedEmployeeIds.includes(employeeId))
      return 'You already booked this ride';
    if (ride.vacantSeats <= 0) return 'No vacant seats available';

    ride.bookedEmployeeIds.push(employeeId);
    ride.vacantSeats--;
    this.updateRide(ride);
    return null;
  }

  ownerHasRideToday(ownerId: string): boolean {
    const today = new Date().toISOString().slice(0, 10);
    return this.getAll().some(
      (r) => r.ownerEmployeeId === ownerId && r.date === today
    );
  }

  getRidesForToday(): Ride[] {
    const today = new Date().toISOString().slice(0, 10);
    return this.getAll().filter((r) => r.date === today);
  }

  getRidesWithinBuffer(time: string, bufferMinutes = 60): Ride[] {
    const toMinutes = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };
    const ref = toMinutes(time);
    const todayRides = this.getRidesForToday();
    return todayRides.filter(
      (r) => Math.abs(toMinutes(r.time) - ref) <= bufferMinutes
    );
  }

  filterByVehicleType(rides: Ride[], type: VehicleType | ''): Ride[] {
    return type ? rides.filter((r) => r.vehicleType === type) : rides;
  }
}
