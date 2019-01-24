import { Component, OnInit } from '@angular/core';
import { Location } from '../location';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  locations: Location[] = [];

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.locationService.getLocations()
      .subscribe(locations => this.locations = locations.slice(1, 5));
  }
}