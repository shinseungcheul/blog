import { NgModule } from '@angular/core';
import { TestRouterModule } from './test.routing';
import { TestComponent } from './test.component';


@NgModule({
  imports: [
    TestRouterModule
  ],
  declarations: [
    TestComponent
  ],
  providers: []
})
export class TestModule { }
