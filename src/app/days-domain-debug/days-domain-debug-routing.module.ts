import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DaysDomainDebugComponent } from './days-domain-debug.component';
const routes: Routes = [
  {
  path:"",
  component:DaysDomainDebugComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DaysDomainDebugRoutingModule { }
