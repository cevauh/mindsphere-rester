import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
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

  constructor(private locationService: LocationService) { 
  }

  // constructor() { 
  // }

  ngOnInit() {
    this.getLocationss();
  }

  onSelect(loc: Location): void {
    this.selectedLocation = loc;

    //nur testweise
    this.selectedLocation.latitude = this.locationService.addiere(this.selectedLocation.latitude,1);
  }

  getLocationss(): void {
    
    //async
    this.locationService.getLocations().subscribe(locations => this.locations = locations);

    //sync
    //this.locations = this.locationService.getLocations();
  } 
}
