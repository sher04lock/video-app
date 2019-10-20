import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { VideoComponent } from './video/video.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
  ],
  imports: [
    BrowserModule
    , AppRoutingModule
    , BrowserAnimationsModule
    , HttpClientModule
    , SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
