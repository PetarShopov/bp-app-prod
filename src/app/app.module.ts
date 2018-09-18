import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { DarpaComponent } from './darpa/darpa.component';
import { WikiRandComponent } from './wiki-rand/wiki-rand.component';
import { MatButtonModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    MatButtonModule,
    AppRoutingModule,
    HttpClientModule,
    JsonpModule,
    MatCardModule
  ],
  declarations: [
    AppComponent,
    DarpaComponent,
    WikiRandComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
