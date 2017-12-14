import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import * as operators from 'rxjs/operators';

@Injectable()
export class ObservableService {
  private subjects : any = {};

  constructor() {  }

  public addObservable(key:string, observable: Subject<any> | Observable<any>){
    this.subjects[key] = observable;
    this.subjects = this.subjects = Object.assign({}, this.subjects);
  }

  public removeObservable(key:string){
    delete this.subjects[key];
    this.subjects = Object.assign({}, this.subjects);
  }

  public getObservable(key:string):any {
    return this.subjects[key];
  }
}
