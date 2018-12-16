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
import { MatDialogModule } from '@angular/material/dialog';

// Components
import { UserDashboardComponent } from './containers/user-dasboard/user-dashboard.component';
import { UserTableComponent } from './components/user-table/user-table.component';

// Services
import { UserService } from '../../services/api/user.service';
import { UserFormComponent } from './components/user-form/user-form.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    CdkTableModule,
    MatDialogModule
  ],
  declarations: [
    UserDashboardComponent,
    UserTableComponent,
    UserFormComponent,
    EditUserComponent,
    CreateUserComponent
  ],
  exports: [
    UserDashboardComponent
  ],
  providers: [
    UserService
  ]
})
export class UserDashboardModule { }
