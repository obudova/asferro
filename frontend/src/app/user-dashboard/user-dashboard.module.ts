import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './containers/user-dasboard/user-dashboard.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UserDashboardComponent
  ],
  exports: [
    UserDashboardComponent
  ]
})
export class UserDashboardModule { }
