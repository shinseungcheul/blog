import { Directive, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/throttle';

@Directive({
  selector: '[focus-event]'
 })
export class FocusDirective {
  private eventType : string = "debounce";
  @Input("duration") _duration : number = 300;

  @Input()
  set debounce(val:string){
    val ? this.eventType = val : null;
  }

  constructor(
    private el : ElementRef,
  ){}


  private addEvent() : Subscription{

    return null;
  }




}

export class FocusOptions {
  element : ElementRef;
  eventType : "debounce" | "throttle";
  duration : number ;
  filter : Function;
  mergeMap : Function;
  handler : Function;
}
