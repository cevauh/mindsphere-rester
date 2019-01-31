import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { LocationService } from '../location.service';
import { Observable, observable } from 'rxjs';
import { of } from 'rxjs';
import { interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { pipe } from 'rxjs';


/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
// Demo Observables Geolocation of Browser

// Create an Observable that will start listening to geolocation updates
// when a consumer subscribes.
const obsLocations = new Observable((observer) => {
  // Get the next and error callbacks. These will be passed in when
  // the consumer subscribes.
  const { next, error } = observer;
  let watchId;

  // Simple geolocation API check provides values to publish
  if ('geolocation' in navigator) {
    watchId = navigator.geolocation.watchPosition(next, error);
  } else {
    error('Geolocation not available');
  }

  // When the consumer unsubscribes, clean up data ready for next subscription.
  return { unsubscribe() { navigator.geolocation.clearWatch(watchId); } };
});
// ende obsLocations


// Call subscribe() to start listening for updates.
const locationsSubscription = obsLocations.subscribe({
  next(position) { console.log('Current Position: ', position); },
  error(msg) { console.log('Error Getting Location: ', msg); }
});

// Stop listening for location after 10 seconds
setTimeout(() => { locationsSubscription.unsubscribe(); console.log('unsubscribe') }, 10000);

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
// Create simple observable that emits three values
const myObservable = of(1, 2, 3, 7);

// Create observer object
const myObserver = {
  next: (x) => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};

// Execute with the observer object
myObservable.subscribe(myObserver);
// Logs:
// Observer got a next value: 1
// Observer got a next value: 2
// Observer got a next value: 3
// Observer got a complete notification


/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

// Subscriped Function
// This function runs when subscribe() is called
function sequenceSubscriber(observerrrr) {
  // synchronously deliver 1, 2, and 3, then complete
  observerrrr.next(1);
  observerrrr.next(2);
  observerrrr.next(3);
  observerrrr.next(4);
  setTimeout(() => {
    observerrrr.next(5);
    observerrrr.complete();     //after complete, things are done.
  }, 5000);
  observerrrr.next(6);
  observerrrr.next(7);

  // unsubscribe function doesn't need to do anything in this
  // because values are delivered synchronously
  return { unsubscribe() { } };
}

// Create a new Observable that will deliver the above sequence
const sequence = new Observable(sequenceSubscriber);

//Functions which subsripe direktly:
// execute the Observable and print the result of each notification
sequence.subscribe({
  next(num) { console.log(num); },
  complete() { console.log('Finished sequence'); }
});

sequence.subscribe({
  next(num) { console.log('2nd: ' + num); },
  complete() { console.log('2nd: Finished sequence'); }
});


// Observer
const myObserver2 = {
  next: (x) => console.log('3rd: ' + x),
  error: err => console.error('3rd: ' + err),
  complete: () => console.log('3rd: Observer got a complete notification'),
};



/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
// Operators : map, filter, 
// Operators take configuration options, and they return a function that takes a source observable. 
// When executing this returned function, the operator observes the source observable’s emitted values, 
// transforms them, and returns a new observable of those transformed values. 

//sequence is the origninal observable, see above.

//map
const squareValues = map((val: object) => Number(val) * Number(val));
const squaredNums = squareValues(sequence);                             //generate new observable, from observable
squaredNums.subscribe(x => console.log('Map Operator :' + x));          //subscript to new observable

//filter
const filterValues = filter((n: object) => Number(n) % 2 !== 0)
const filteredValue = filterValues(sequence);
filteredValue.subscribe(x => console.log('Filter Operator :' + x));


//pipe Standalone 
// You can use pipes to link operators together. Pipes let you combine multiple functions 
// into a single function. The pipe() function takes as its arguments the functions you want to combine, 
// and returns a new function that, when executed, runs the composed functions in sequence.
const squareOddVals = pipe(
  filter((n: object) => Number(n) % 2 !== 0),
  map(n => Number(n) * Number(n))
);

const squareOdd = squareOddVals(sequence);  //generate new observable, from observable
squareOdd.subscribe(x=> console.log('piped: '+x));//subscript to new observable

////////////////////////////////////////////////////////////////////////
//pipe() is also a funktion of an observable, so shorter:
const squareOdd2 = of(1, 2, 3, 4, 5, 6, 7, 8)                     //generate new observable
  .pipe(                                                          //use pipe as funktion
    filter(n => n % 2 !== 0),
    map(n => n * n)
  );

// Subscribe to get values
squareOdd2.subscribe(x => console.log('short pipe: ' +x));





/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
// Create an Observable that will publish a value on an interval
//observable functions: Intervall
const secondsCounter = interval(1000) //generate new observable
const timeobserver = { next: (n => console.log(`It's been ${n} seconds since subscribing!`)) };








@Component({
  selector: 'app-here-demo',
  templateUrl: './here-demo.component.html',
  styleUrls: ['./here-demo.component.css']
})
export class HereDemoComponent implements OnInit {

  constructor(public locationService: LocationService, public messageService: MessageService) { }

  ngOnInit() {
  }

  get1() {
    this.messageService.add("get1 button pressed");
    // setTimeout(function(){ alert("Hello"); }, 3000);
    // setTimeout(()=>{alert("Hallo")},3000) 
    //myObservable.subscribe(myObserver);
    sequence.subscribe(myObserver2);
  }

  get2() {
    this.messageService.add("get2 button pressed");
    // secondsCounter.subscribe(n => console.log(`It's been ${n} seconds since subscribing!`));
    secondsCounter.subscribe(timeobserver);

  }

  get3() {
    this.messageService.add("get3 button pressed");
  }
  get4() { }

  getLocations(): void {
  }






}
