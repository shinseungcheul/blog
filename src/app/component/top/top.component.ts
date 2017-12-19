import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { ObservableService } from '../../service/global-observable';

@Component({
  selector: 'top-menu',
  templateUrl: 'top.component.html',
  styleUrls: [
    './top.component.scss'
  ]
})
export class TopComponent implements OnInit {
  categories : any[] = [];
  categoryObject : Observable<any> ;
  private addCategoryName : string = "";


  constructor(
    private fireDb : AngularFireDatabase,
    private observableService : ObservableService
  ) {  }

  ngOnInit() {
    this.categoryObject = this.fireDb.list("/categories").valueChanges();
    this.categoryObject.subscribe( res => this.categories = res)
  }

  update(){
    let updateKey = firebase.database().ref().child("categories").push().key
    console.log( updateKey );
    let updates = {};
    updates['/categories/'+updateKey] = {name : "Python", url : "python"};
    firebase.database().ref().update(updates);
  }

  public addCategory(){
    console.log(firebase.database().ref("/categories"))
  }
}
