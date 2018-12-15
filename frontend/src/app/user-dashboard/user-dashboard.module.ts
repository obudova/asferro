import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './containers/user-dasboard/user-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  declarations: [
    UserDashboardComponent
  ],
  exports: [
    UserDashboardComponent
  ]
})
export class UserDashboardModule { }
