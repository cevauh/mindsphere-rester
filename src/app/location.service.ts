import { Injectable } from '@angular/core';
import { Location } from './location';
import { LOCATIONS } from './mock-locations';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})

export class LocationService {
  
  getLocations(): Observable <Location[]> {
    this.messageService.add('LocationService: fetched locations')
    return of(LOCATIONS);
  }

  getLocation(id:number): Observable <Location>{
    //todo: send the message __after__ fetching the hero
    this.messageService.add(`Location Service: fetched hero id=${id}`);

    return of(LOCATIONS.find(location => location.id ===id));
  }

  //only for simple test
  addiere(a:number, b:number):number{
    console.log("LocationService.addiere "+a+" + "+b);
    return (a+b);
  }



  // getHeroes(): Observable<Hero[]> {
  //   return of(HEROES);
  // }

  //constructor() { }
  constructor(public messageService: MessageService) { }   //Dependency Injection
}
