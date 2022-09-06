import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentMappedComponent } from './component-mapped.component';
const routes: Routes = [
  {
    path:"",
    component:ComponentMappedComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentMappedRoutingModule { }
