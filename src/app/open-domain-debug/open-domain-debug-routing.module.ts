import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenDomainDebugComponent } from './open-domain-debug.component';
const routes: Routes = [
  {
    path:"",
    component:OpenDomainDebugComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenDomainDebugRoutingModule { }
