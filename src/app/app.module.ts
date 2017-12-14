import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { AppRouterModule } from './app.router';
import { TopComponent, KeywordComponent } from './component'
import { PostModule } from './post/post.module';
import { ObservableService } from './service/global-observable';


import { AngularFireModule } from 'angularfire2/angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth'
// import { AngularFirestore } from 'angularfire2/firestore'
import { config } from '../environments/config'


@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    KeywordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(config.firebase),
    PostModule,
    AppRouterModule,
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    ObservableService,
    // AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
