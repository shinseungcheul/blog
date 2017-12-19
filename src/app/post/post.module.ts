import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostRouterModule } from './post.router';
import { PostComponent } from './post.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ObservableService } from '../service/global-observable';
import { DatePipe } from "./post.pipe"
import { AngularFirestore} from 'angularfire2/firestore'

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CKEditorModule,
    PostRouterModule,
  ],
  declarations: [
    DatePipe,
    PostComponent
  ],
  providers: [
  ]
})
export class PostModule { }
