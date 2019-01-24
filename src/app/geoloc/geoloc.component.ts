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
}
