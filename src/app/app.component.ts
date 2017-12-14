import { Component, Input, QueryList } from '@angular/core';
import { NgbSlide, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'app';
  content : any ;
  list:any =[];
  constructor(){
    this.content = '<p>Hello <strong>World !</strong></p>'
    this.list = [
      "aaaa","bbbbb","ccccc","dddd"
    ]
  }

  toSlide(){
  }
}
