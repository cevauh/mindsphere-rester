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

  //only for simple test
  addiere(a:number, b:number):number{
    return (a+b);
  }


  // getHeroes(): Observable<Hero[]> {
  //   return of(HEROES);
  // }

  constructor() { }
}
