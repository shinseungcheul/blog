import { NgModule } from '@angular/core';

import { TestComponent } from './test.component';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes= [
    { path : 'test', component : TestComponent}
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
export class TestRouterModule { }
