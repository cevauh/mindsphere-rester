import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeolocComponent } from './geoloc/geoloc.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocationDetailComponent }  from './location-detail/location-detail.component';
import { HereDemoComponent} from './here-demo/here-demo.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
  ,
  { path: 'dashboard', component: DashboardComponent }
  ,
  { path: 'locations', component: GeolocComponent }
  ,
  { path: 'heredemo', component: HereDemoComponent }
  ,
  { path: 'detail/:id', component: LocationDetailComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})




export class AppRoutingModule {
}