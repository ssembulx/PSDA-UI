import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpentargetwiseComponent } from './opentargetwise.component';
const routes: Routes = [
  {
    path:"",
    component:OpentargetwiseComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpentargetwiseRoutingModule { }
