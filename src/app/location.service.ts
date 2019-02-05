import { Injectable } from '@angular/core';
import { Location } from './location';
import { LOCATIONS } from './mock-locations';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};




@Injectable({
  providedIn: 'root'
})

export class LocationService {

  // Get locations from MocData uses the RxJS of() function 
  // getLocations(): Observable<Location[]> {
  //   this.messageService.add('LocationService: fetched locations')
  //   return of(LOCATIONS);
  // }

  /** GET heroes from the server */
  // private locationssUrl = 'api/locations';  // URL to web api
  // getLocations(): Observable<Location[]> {
  //   return this.http.get<Location[]>(this.locationssUrl)
  // }

  /** GET heroes from the server with error handling */
  private locationsUrl = 'api/locations';  // URL to web api
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.locationsUrl)
      .pipe(
        tap(_ => this.log('fetched locations')),
        catchError(this.handleError('getLocations', []))
      );
  }

  /** GET hereLocations from the server with error handling */
  private hereLocationsUrl = 'api/locations';  // URL to web api
  getHereLocations(): Observable<Location> {
    return this.http.get<Location>(this.hereLocationsUrl)
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleHereError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}




  // getLocation(id: number): Observable<Location> {
  //   //todo: send the message __after__ fetching the hero
  //   this.messageService.add(`Location Service: fetched hero id=${id}`);
  //   return of(LOCATIONS.find(location => location.id === id));
  // }

  /** GET hero by id. Will 404 if id not found */
  getLocation(id: number): Observable<Location> {
    const url = `${this.locationsUrl}/${id}`;
    return this.http.get<Location>(url).pipe(
      tap(_ => this.log(`fetched location id=${id}`)),
      catchError(this.handleError<Location>(`getLocation id=${id}`))
    );
  }

  // Get koordinates from Adress
  // http://geocoder.api.here.com/6.2/geocode.json?app_id=DnjaoL83Vl6cz2PzXZbj&app_code=cfEeqEWNLklJIHzJ_3B8Zg&searchtext=Diepenbroichstr.%2012,%2050354%20H%C3%BCrth
  

  private HereUrl = 'geocoder.api.here.com/6.2/geocode.json';  // URL to web api

  stringTemplateDemo(strings, ...keys) {
      return (function(...values) {
      var dict = values[values.length - 1] || {};
      var result = [strings[0]];
      keys.forEach(function(key, i) {
        var value = Number.isInteger(key) ? values[key] : dict[key];
        result.push(value, strings[i + 1]);
      });
      return result.join('');
    });
  };

  t1Closure = this.stringTemplateDemo`${0}${1}${0}!`;
  t2Closure = this.stringTemplateDemo`${0} ${'foo'}!`;
  
  // wird von Componente aufgerufen
  demoStringTemplate(strIn: string):void{    
    console.log(this.t1Closure('Y', 'A'));  // "YAY!");  
    console.log(this.t2Closure('Hello', {foo: 'World'}));  // "Hello World!"
  }

  
  
  





  /** PUT: update the hero on the server */
  updateLocation(location: Location): Observable<any> {
    return this.http.put(this.locationsUrl, location, httpOptions).pipe(
      tap(_ => this.log(`updated location id=${location.id}`)),
      catchError(this.handleError<any>('updateLocation'))
    );
  }

  /** POST: add a new hero to the server */
  addLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(this.locationsUrl, location, httpOptions).pipe(
      tap((location: Location) => this.log(`added location w/ id=${location.id}`)),
      catchError(this.handleError<Location>('addLocation'))
    );
  }


  /** DELETE: delete the hero from the server */
  deleteLocation(location: Location | number): Observable<Location> {
    const id = typeof location === 'number' ? location : location.id;
    //if typeof hero = number, than hero, else hero.id

    const url = `${this.locationsUrl}/${id}`;

    return this.http.delete<Location>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted location id=${id}`)),
      catchError(this.handleError<Location>('deletLocation'))
    );
  }

  /* GET heroes whose name contains search term */
  searchLocations(term: string): Observable<Location[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Location[]>(`${this.locationsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Location[]>('searchLocations', []))
    );
  }

  /** Log a LocationService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`LocationService: ${message}`);
  }

  //only for simple test
  addiere(a: number, b: number): number {
    console.log("LocationService.addiere " + a + " + " + b);
    return (a + b);
  }



  //constructor() { }
  constructor(private http: HttpClient, public messageService: MessageService) { }   //Dependency Injection

}
