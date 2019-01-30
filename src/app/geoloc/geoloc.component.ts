import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { MessageService } from '../message.service';
import { Location } from '../location';
import { LOCATIONS } from '../mock-locations';

@Component({
  selector: 'app-geoloc',
  templateUrl: './geoloc.component.html',
  styleUrls: ['./geoloc.component.css']
})

export class GeolocComponent implements OnInit {
// locations = LOCATIONS;
locations: Location[];

selectedLocation: Location;

  constructor(public locationService: LocationService, public messageService: MessageService) { 
  }

  // constructor() { 
  // }

  ngOnInit() {
    this.getLocations();
  }

  // wurde benutzt, bevor die detail aus wahl über router ging. also via Code
  // Previously, this, the parent Component set the HeroDetailComponent.hero property and the HeroDetailComponent displayed the hero.
  // onSelect(loc: Location): void {
  //   this.selectedLocation = loc;

  //   //nur testweise
  //   this.selectedLocation.latitude = this.locationService.addiere(this.selectedLocation.latitude,1);
  // }

  getLocations(): void {

    console.log('GeolocComponent.getLocations')
    
    //async
    this.locationService.getLocations().subscribe(locations => this.locations = locations);

    //sync
    //this.locations = this.locationService.getLocations();
    
  } 


  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.locationService.addLocation({ name } as Location)
      .subscribe(location => {
        this.locations.push(location);
      });
  }

  delete(location: Location): void {
    this.locations = this.locations.filter(l => l !== location);
    this.locationService.deleteLocation(location).subscribe();
    // If you neglect to subscribe(), the service will not send the delete request to the server! 
    // As a rule, an Observable does nothing until something subscribes!
  }

}
