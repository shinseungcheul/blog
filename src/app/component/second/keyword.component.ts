import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap} from '@angular/router'
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { ObservableService } from '../../service/global-observable';
import { Subject } from 'rxjs/Subject';
// import * as operators from 'rxjs/operators';
import 'rxjs/add/observable/from'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/delay'


@Component({
  selector: 'keyword',
  templateUrl: 'keyword.component.html',
  styleUrls:[
    './keyword.component.scss'
  ]
})
export class KeywordComponent implements OnInit, OnDestroy {
  @Input("keywords") _keywords : any = [];
  @Output() out : EventEmitter<string[]> = new EventEmitter();
  id : string = "";
  private cssClasses : string[] = [
    "btn-success", "btn-danger","btn-warning","btn-info","btn-light"
  ]

  private tags : any[] ;

  private subject : Subject<any> = new Subject();
  private maps : any = {};

  constructor(
    private fireDb : AngularFireDatabase,
    private activatedRouter : ActivatedRoute,
    private observableService : ObservableService
  ) {  }

  ngOnInit() {
    this.observableService.addObservable("keyword",this.subject);
    this.subject.filter( (p) => {
      console.log(p, "filter")
      return p.state == "changed"
    }).subscribe( (p) => {
      this.init(p.id);
      this.id = p.id
    })

    this.fireDb.list("/tags").valueChanges().subscribe((result) => {
      this.tags = result
    })
    // firebase.database().ref().once()

  }

  ngOnDestroy(){

  }

  init(id?:string){
    // this.tags.filter((t) => {
    //   t.categories.forEach((p) => p)
    // })
  }

  click(target:any){

  }

  getClasssss(i:number){
    return this.cssClasses[i]
  }
}
