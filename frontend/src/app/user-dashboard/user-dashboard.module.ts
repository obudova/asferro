import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatButtonModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

// Components
import { UserDashboardComponent } from './containers/user-dasboard/user-dashboard.component';
import { UserTableComponent } from './components/user-table/user-table.component';

// Services
import { UserService } from '../../services/api/user.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    CdkTableModule
  ],
  declarations: [
    UserDashboardComponent,
    UserTableComponent
  ],
  exports: [
    UserDashboardComponent
  ],
  providers: [
    UserService
  ]
})
export class UserDashboardModule { }
