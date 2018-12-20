import { Component, OnInit } from '@angular/core';
import { Location } from '../location';

@Component({
  selector: 'app-geoloc',
  templateUrl: './geoloc.component.html',
  styleUrls: ['./geoloc.component.css']
})
export class GeolocComponent implements OnInit {
  location : Location = {
    longitude: 12.4,
    latitude: 66.4
  };

  // longitude = '7.0';
  // latitude = '50.0';
  constructor() { }

  ngOnInit() {
  }

}
