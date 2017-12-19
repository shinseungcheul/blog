import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import { Tag } from '../type'

@Component({
  templateUrl: 'test.component.html',
})
export class TestComponent implements OnInit {
  constructor(
    private fireDb : AngularFireDatabase
  ) {  }

  ngOnInit() {}

  test(){
    console.log(firebase.database().ref("/tags") );
    console.log("test")
  }


  addTag(){
    let tag = new Tag();
    let tags = firebase.database().ref("/tags")
    let updateKey : string  = tags.push().key;
    console.log(updateKey)
    tag.uid= updateKey;
    tag.name = "java"
    tag.refPosts = ["-L0HmUYzyjfbAdeQ9JuA"];
    tag.category = "java"
    let uo = {};
    uo[updateKey] = tag;
    tags.update(uo);
  }
}
