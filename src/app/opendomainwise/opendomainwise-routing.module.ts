import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpendomainwiseComponent } from './opendomainwise.component';
const routes: Routes = [
  {
  path:"",
  component:OpendomainwiseComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpendomainwiseRoutingModule { }
