import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// @Todo: create module for services

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserDashboardModule } from './user-dashboard/user-dashboard.module';
import { RequestService } from '../services/request.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UserDashboardModule,
    HttpClientModule
  ],
  providers: [RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
