import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialComponentsModule } from './material-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RatingComponent } from './rating/rating.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RatingComponent],
  imports: [
    CommonModule
    , MaterialComponentsModule
    , FormsModule
    , ReactiveFormsModule
    , FlexLayoutModule
    , FontAwesomeModule
  ],
  exports: [
    CommonModule
    , MaterialComponentsModule
    , FormsModule
    , ReactiveFormsModule
    , FlexLayoutModule
    , FontAwesomeModule
    , RatingComponent
  ]
})
export class SharedModule { }
