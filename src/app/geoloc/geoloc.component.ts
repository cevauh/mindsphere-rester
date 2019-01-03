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
    this.getLocations();
  }

  onSelect(loc: Location): void {
    this.selectedLocation = loc;
  }

  getLocations(): void {
    this.locations = this.locationService.getLocations();
  } 
}
