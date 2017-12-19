import { Component, OnInit, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params} from '@angular/router';
import { ObservableService } from '../service/global-observable';
import { Subject } from 'rxjs/Subject';
import { Post } from '../type'
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
  @HostListener("focusin",["$event"])
  public focus(event){
    console.log(event, "aaas");
  }


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



}
