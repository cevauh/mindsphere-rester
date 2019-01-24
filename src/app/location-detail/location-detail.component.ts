import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location as NgLocation} from '@angular/common';
import { Location } from '../location';


// import { MyLocation } from '../location';
import { LocationService }  from '../location.service';


@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {

  location: Location;

  //wurde vorher von übergeordneter componente übergeben (geoloc.component)
  // @Input() location: Location; 
  //constructor() {console.log('constructor LocationDetailComponent '); }
  constructor(
    private route:            ActivatedRoute,
    private locationService:  LocationService,
    private nglocation:       NgLocation
  ) {
    console.log('constructor LocationDetailComponent ');
  }

  ngOnInit():void {
    this.getHero();
  }

  getHero():void{
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('id ist: ' + id);
    //arrow functions (Parameters are left of => return value is right)
    this.locationService.getLocation(id).subscribe(location => this.location = location);
  }

  setLongitude(val:number):void{
    this.location.longitude = val;
  }

  goBack(): void {
    this.nglocation.back();
  }

}
