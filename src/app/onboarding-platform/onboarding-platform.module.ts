import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingPlatformComponent } from './onboarding-platform.component';
import { SearchPipe } from '../search.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OnboardingPlatformComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OnboardingPlatformModule { }
