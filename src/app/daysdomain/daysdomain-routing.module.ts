import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DaysdomainComponent } from './daysdomain.component';
const routes: Routes = [
  {
    path:"",
    component:DaysdomainComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DaysdomainRoutingModule { }
