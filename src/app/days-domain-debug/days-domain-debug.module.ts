import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaysDomainDebugComponent } from './days-domain-debug.component';
import { DaysDomainDebugRoutingModule } from './days-domain-debug-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import {  ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DaysDomainDebugComponent
  ],
  imports: [
    CommonModule,
    DaysDomainDebugRoutingModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class DaysDomainDebugModule { }
