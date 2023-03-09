import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ServiceAPIService } from './service-api.service';
import { BroadCastServiceService } from './broad-cast-service.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import { SpinnerInterceptor } from './spinner.interceptor';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from "ngx-ui-loader";
import { ModelpopupComponent } from './modelpopup/modelpopup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SuccesspopupComponent } from './successpopup/successpopup.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { EditdialogComponent } from './dialog/edit/editdialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { TestComponent } from './test/test.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HighlightSearch } from './test/test.component';
import { ProgramMgmtComponent } from './program-mgmt/program-mgmt.component';
import { PlatformOnboardingComponent } from './platform-onboarding/platform-onboarding.component';
// import { ResizeColumnDirective } from './report-template/resize-column.directive';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { OnboardingPlatformModule } from './onboarding-platform/onboarding-platform.module';





const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 20
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
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
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    SpinnerOverlayComponent,
    ModelpopupComponent,
    SuccesspopupComponent,
    EditdialogComponent,
    TestComponent,
    HighlightSearch,
    ProgramMgmtComponent,
    PlatformOnboardingComponent,
    // ResizeColumnDirective
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatTreeModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatTooltipModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule,
    MatDialogModule,
    CommonModule,
    NotifierModule.withConfig(customNotifierOptions),
    MatSnackBarModule,
    MatButtonToggleModule,
    OnboardingPlatformModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }, ServiceAPIService, BroadCastServiceService],
  bootstrap: [AppComponent],
})
export class AppModule { }
