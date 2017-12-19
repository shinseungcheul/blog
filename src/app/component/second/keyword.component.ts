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

import { Tag } from '../../type'
import { categoryClass } from '../../constant'

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

  private tags : any[] = [];
  private tagsData : any = null;
  private subject : Subject<any> = new Subject();
  private maps : any = {};

  constructor(
    private fireDb : AngularFireDatabase,
    private activatedRouter : ActivatedRoute,
    private observableService : ObservableService,
  ) {  }

  ngOnInit() {
    this.observableService.addObservable("keyword",this.subject);

    this.subject.filter( (p) => {
      console.log(p, "filter")
      return p.state == "changed"
    }).subscribe( (p) => {
      this.id = p.id
      this.init(p.id);
    })



  }

  ngOnDestroy(){

  }

  init(id?:string){
    this.tags = [];
    console.log(typeof this.id,"?????")
    if( this.id == null || this.id == "" || typeof this.id === "undefined"){
      firebase.database().ref("/tags")
              .orderByChild("category")
              .once("value").then((ref) => {
        ref.forEach( r => {
          this.tags.push(r.toJSON())
        } )
      })
      return ;
    }

    firebase.database().ref("/tags")
            .orderByChild("category")
            .equalTo(this.id ? this.id : "*")
            .once("value").then((ref) => {
      ref.forEach( r => {
        this.tags.push(r.toJSON())
      } )
    })


    // this.fireDb.list("/tags").valueChanges().subscribe( ref => {
    //   this.tags = ref
    // })


    // let ref = firebase.database().ref("/tags")
    //                   .orderByChild("category")
    //                   // .equalTo( true)
    //                   .once("value", ref => {
    //                     console.log(ref)
    //                   });

    // firebase.database().ref("/tags").once('value',ref => {
    //   this.tags = new Array(ref.toJSON());
    //   console.log(this.tags, this.tagsData)
    // })
  }

  click(target:any){

  }

  getClass(tag : Tag){
    return categoryClass[tag.category]
  }
}
