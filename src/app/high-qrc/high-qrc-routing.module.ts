import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HighQRCComponent } from './high-qrc.component';
const routes: Routes = [
  {
    path:"",
    component:HighQRCComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HighQrcRoutingModule { }
