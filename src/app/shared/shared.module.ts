import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RatingComponent } from './rating/rating.component';

@NgModule({
  declarations: [RatingComponent],
  imports: [
    CommonModule
    , MaterialComponentsModule
    , FlexLayoutModule
    , FontAwesomeModule
  ],
  exports: [
    CommonModule
    , MaterialComponentsModule
    , FlexLayoutModule
    , FontAwesomeModule
    , RatingComponent
  ]
})
export class SharedModule { }
