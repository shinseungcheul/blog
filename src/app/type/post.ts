export class Post {
  constructor(){
    this.createdAt = Date.now();
  }
  uid : string;
  subject : string;
  tags : TagKey[];
  content : string;
  category : string;
  createdAt : number;
  createdUserId : string;
  createdUserName : string;

}

export interface TagKey {
  name : string;
  uid : string;
}
