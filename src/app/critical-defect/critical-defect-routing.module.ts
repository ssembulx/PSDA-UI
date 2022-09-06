import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriticalDefectComponent } from './critical-defect.component';
const routes: Routes = [
  {
  path:"",
  component:CriticalDefectComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CriticalDefectRoutingModule { }
