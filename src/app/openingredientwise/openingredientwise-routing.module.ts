import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpeningredientwiseComponent } from './openingredientwise.component';
const routes: Routes = [
  {
    path:"",
    component:OpeningredientwiseComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpeningredientwiseRoutingModule { }
