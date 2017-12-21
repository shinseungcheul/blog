import { Component, OnInit, AfterViewInit, OnDestroy, HostListener, ViewChildren, QueryList, ViewChild, ElementRef} from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params} from '@angular/router';
import { ObservableService } from '../service/global-observable';
import { Subject } from 'rxjs/Subject';
import { Post,Tag } from '../type'
import { TagActionDirective } from './tag.directive';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

import { categoryClass } from '../constant'


@Component({
  selector: 'post-body',
  templateUrl: 'post.component.html',
  styleUrls: [
    './post.component.scss'
  ]
})
export class PostComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(TagActionDirective) _tagActions : QueryList<TagActionDirective>;

  private category : string= '';
  keywordSubject : Subject<any>;
  list : any = Array.from(Array(10).keys());
  // content : string ='';
  selected : Post ;
  isEdit : boolean = false;
  posts : any[] = [];
  constructor(
    private activatedRouter : ActivatedRoute,
    private observableService : ObservableService,
    private fireDb : AngularFireDatabase,
    private fireAuth : AngularFireAuth,
    private fireStore : AngularFirestore,
  ) {  }

  ngOnInit() {
    this.selected = null;
    this.keywordSubject = this.observableService.getObservable("keyword");

    this.activatedRouter.paramMap.subscribe( (p:Params) =>{
      this.category = p.params.id;
      this.selected = null;
      this.keywordSubject.next({state : "changed", id :p.params.id})
      this.init();
    }  )


  }

  ngOnDestroy(){
    this.selected = null;
    this.category = null;
  }



  init(){
    this.list = this.fireDb.list("/posts", ref => {

      if(this.category || this.category ==""){
        return ref.orderByChild("category").equalTo(this.category).limitToLast(10)
      }
      return ref.orderByChild("createdAt").limitToLast(10);
    }).valueChanges().subscribe( (res:Post[]) => {
      this.posts = res.reverse();
      console.log(this.posts)
      if(!this.selected || this.selected == null){
        console.log("여기?")
        // console.log(this.posts.splice(0,1)[0])
        let temp = this.posts[0]
        this.select(temp)
      }
    })
  }

  ngAfterViewInit(){

  }

  public log(){
    this._tagActions.forEach(r => console.log(r))
  }

  public select(item:Post){
    this.selected = item;
  }

  public saveContent(){
    let temp = this.fireDb.object("/posts/"+this.selected.uid);

  }

  public addPost(){
    let post = new Post();
    // post.subject = "제목을 입력해주세요";
    post.subject = prompt("제목을 입력해주세요")
    post.createdUserId = this.fireAuth.auth.currentUser.uid
    post.createdUserName = this.fireAuth.auth.currentUser.displayName
    post.category = this.category ? this.category : "java"
    post.content = ' <p>내용</p>';
    post.uid = this.fireDb.createPushId();
    let postObject = this.fireDb.object("/posts/"+post.uid);
    console.log(postObject)
    postObject.update(post).then( () => {
      this.selected = post;
      this.isEdit = true;
    })
  }

  public edit(){
    if(this.isEdit){
      let postObject = this.fireDb.object("/posts/"+this.selected.uid);
      postObject.update(this.selected).then( () => {
        this.isEdit = !this.isEdit;
      })
    }else {
      this.isEdit = !this.isEdit
    }

  }

  public delete(){
    let post = this.fireDb.object("/posts/"+this.selected.uid);
    post.remove();
    this.selected = null;
  }

  public getClass():string{
    return categoryClass[this.selected.category]
  }

  private updateTag : boolean = false;
  private tagString : string = ""
  @ViewChild('tagInput') _tagInput : ElementRef ;

  public editTag(e:Event){
    this.updateTag = true;

  }

  public updateTagFn(){
    if(this.tagString =="" || this.tagString == null){
      this.updateTag = false;
      return;
    }
    console.log(this.selected)
    let isDuplicated : boolean = false
    if(this.selected.tags != null || this.selected.tags){
      isDuplicated = Boolean(this.selected.tags.filter(tag => tag.name === this.tagString).length);
    }else {
      this.selected.tags = [];
    }
    if(isDuplicated){
      this.tagString = "";
      this.updateTag = false;
      return;
    }
    let serverTag:firebase.database.Reference = firebase.database().ref("/tags")
    this.updateTagfn(serverTag);



  }

  public updateTaginPost(tagKey:string){
    let fObject = firebase.database().ref("/posts/"+this.selected.uid+"/tags");
    this.selected.tags.push({name:this.tagString, uid : tagKey})
    console.log(this.selected.tags)
    fObject.update(this.selected.tags);
    this.updateCompleted()
  }

  public updateCompleted(){
    this.updateTag = false;
    this.tagString = "";
  }

  public createTag():Tag{
    let newTag = new Tag();
    newTag.category = this.category;
    newTag.name = this.tagString;
    newTag.refPosts = [this.selected.uid];
    return newTag;
  }

  public updateTagfn(serverTag:firebase.database.Reference){
    serverTag.orderByChild("name")
            .equalTo(this.tagString)
            .once('value').then( tagRef => {
              console.log(tagRef)
              let tagKey : string = "";
              let flag = false;
              let temp : firebase.database.DataSnapshot[] = [];
              tagRef.forEach( r => {
                if (r.toJSON().category == this.category) {
                    temp.push(r)
                    flag = true;
                }
              })
              if(flag){
                temp.forEach( (d:firebase.database.DataSnapshot) => {
                  tagKey = d.ref.key
                  d.ref.child("/refPosts").push(this.selected.uid) ;
                })

              }else {
                let newTag = this.createTag();
                newTag.uid = tagRef.ref.push().key;
                firebase.database().ref("/tags/"+newTag.uid).update(newTag);
                tagKey = newTag.uid;
              }


              this.updateTaginPost(tagKey);

              // if(temp.length > 0){
              //   console.log(temp)
              // }
            });
  }



}
