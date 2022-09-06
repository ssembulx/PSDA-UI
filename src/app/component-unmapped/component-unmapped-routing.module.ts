import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentUnmappedComponent } from './component-unmapped.component';
const routes: Routes = [
  {
    path:"",
    component:ComponentUnmappedComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentUnmappedRoutingModule { }
