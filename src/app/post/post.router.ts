import { NgModule } from '@angular/core';
import { PostComponent } from './post.component';
import { Routes, RouterModule } from '@angular/router';

const routes : Routes = [
  { path : "post", component : PostComponent },
  { path : "post/:id", component : PostComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: []
})
export class PostRouterModule { }
