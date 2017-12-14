export class Post {
  constructor(){
    this.createdAt = Date.now();
  }
  uid : string;
  subject : string;
  tag : string[]
  content : string;
  category : string;
  createdAt : number;
  createdUserId : string;
  createdUserName : string;

}
