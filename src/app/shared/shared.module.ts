import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from './material-components/material-components.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
    , MaterialComponentsModule
  ],
  exports: [
    CommonModule
    , MaterialComponentsModule
  ]
})
export class SharedModule { }
