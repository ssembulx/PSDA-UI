import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportGenerationRoutingModule } from './report-generation-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { ReportGenerationComponent } from './report-generation.component';
@NgModule({
  declarations: [
    ReportGenerationComponent
  ],
  imports: [
    CommonModule,
    ReportGenerationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule
  ]
})
export class ReportGenerationModule { }
