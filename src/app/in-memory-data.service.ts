import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Location } from './location';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const locations = [
      { name: 'Kautexx', adress: 'Kautexstraße 54, 53229 Bonn', longitude: 0.0, latitude: 0.0, weather:'', id:1},
      { name: 'Efferen', adress: 'Diepenbroichstr. 8, 50354 Hürth', longitude: 0.0, latitude: 0.0,weather:'', id:2},
      { name: 'Sauerland', adress: 'Zum Schee 12, 57413 Finnentrop', longitude: 0.0, latitude: 0.0,weather:'', id:3},
      { name: 'Dom', adress: 'Domkloster 4, 50667 Köln', longitude: 0.0, latitude: 0.0,weather:'', id:4},
      { name: 'Empire State', adress: '20 W 34th St, New York, NY 10001, USA', longitude: 0.0, latitude: 0.0,weather:'', id:5},
      { name: 'San Torini', adress: 'Firá 847 00, Griechenland', longitude: 0.0, latitude: 0.0,weather:'', id:6},
      { name: 'NH Aviles', adress: ' Plaza de España, 9 33400 Aviles, Spain', longitude: 0.0, latitude: 0.0,weather:'', id:7}
        ];
    return {locations};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(locations: Location[]): number {
    return locations.length > 0 ? Math.max(...locations.map(location => location.id)) + 1 : 11;
  }
}