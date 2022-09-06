import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrcHSDESComponent } from './qrc-hsdes.component';
const routes: Routes = [
  {
    path:"",
    component:QrcHSDESComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrcHsdesRoutingModule { }
