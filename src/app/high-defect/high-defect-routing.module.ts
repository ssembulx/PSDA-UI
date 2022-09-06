import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HighDefectComponent } from './high-defect.component';
const routes: Routes = [
  {
    path:"",
    component:HighDefectComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HighDefectRoutingModule { }
