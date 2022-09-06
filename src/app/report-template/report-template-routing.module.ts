import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportTemplateComponent } from './report-template.component';
const routes: Routes = [
  {
    path:"",
    component:ReportTemplateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportTemplateRoutingModule { }
