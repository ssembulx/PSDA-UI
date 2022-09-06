import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportTemplateRoutingModule } from './report-template-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { SampleModule } from '../sample/sample.module';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ReportTemplateComponent } from './report-template.component';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule} from '@angular/material/slider';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 100,
			gap: 20
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 3000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
@NgModule({
  declarations: [
    ReportTemplateComponent,
  ],
  imports: [
    CommonModule,
    ReportTemplateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatButtonModule,
    SampleModule,
    MatProgressBarModule,
    NotifierModule.withConfig(customNotifierOptions),
    MatCheckboxModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatSliderModule,
    MatButtonToggleModule
  ],
  providers: [SpinnerOverlayService],
  bootstrap: [ReportTemplateComponent],
})
export class ReportTemplateModule { }
