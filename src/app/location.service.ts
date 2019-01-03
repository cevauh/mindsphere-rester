import { Injectable } from '@angular/core';
import { Location } from './location';
import { LOCATIONS } from './mock-locations';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LocationService {
  
  getLocations(): Observable <Location[]> {
    return of(LOCATIONS);
  }

  // getHeroes(): Observable<Hero[]> {
  //   return of(HEROES);
  // }

  constructor() { }
}
