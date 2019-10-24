import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSliderModule
  , MatCardModule
  , MatToolbarModule
  , MatSidenavModule
  , MatIconModule
  , MatListModule
  , MatButtonModule
  , MatProgressBarModule
  , MatTooltipModule
} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatSliderModule
    , MatCardModule
    , MatToolbarModule
    , MatSidenavModule
    , MatIconModule
    , MatListModule
    , MatButtonModule
    , MatProgressBarModule
    , MatTooltipModule
  ]
})
export class MaterialComponentsModule { }
