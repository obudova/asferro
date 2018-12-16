import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent, Sort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { User } from '../../../../services/api/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  @Input()
  totalUsers: number;

  @Input()
  pageSize: number;
  @Input()
  pageIndex: number;

  @Input()
  sortKey?: string;
  @Input()
  sortOrder?: string;

  @Input()
  dataSource: DataSource<User[]>;

  @Output()
  rowClicked = new EventEmitter<User>();

  displayedColumns = ['name'];

  handleRowClick(user: User) {
    this.rowClicked.emit(user);
  }
}
